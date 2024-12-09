import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { TrafficSourceForm, TrafficSourceItem } from 'features/Settings/types/TrafficSource'
import { useFormik } from 'formik'
import TrafficSourceSchema, {
  EMPTY_TRAFFIC_SOURCE,
} from 'features/Settings/schema/TrafficSource/TrafficSourceSchema'
import { useTrafficSourceEdition } from 'features/Settings/hooks/TrafficSource/useTrafficSourceEdition'
import { trafficSourcesToForm } from 'features/Settings/transformers/TrafficSource'
import _ from 'lodash'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useFetchProviders from 'hooks/useFetchProviders'

interface TrafficSourceEditionProps {
  open: boolean
  onClose: () => void
  trafficSource?: TrafficSourceItem
}

function TrafficSourceEdition({
  open,
  onClose,
  trafficSource,
}: TrafficSourceEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.trafficSource' })
  const { onSubmit } = useTrafficSourceEdition(trafficSource?.id)
  const { providersOptions } = useFetchProviders()

  const {
    handleChange,
    handleBlur,
    values,
    resetForm,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    isValid,
  } = useFormik<TrafficSourceForm>({
    initialValues: EMPTY_TRAFFIC_SOURCE,
    validateOnChange: false,
    validationSchema: TrafficSourceSchema,
    onSubmit: (data) => {
      onSubmit(data).then(() => onClose())
    },
  })

  useEffect(() => {
    if (trafficSource) {
      resetForm({
        values: trafficSourcesToForm(trafficSource),
      })
    }
  }, [trafficSource])

  const debouncedValidateField = useCallback(_.debounce(setFieldTouched, 500), [setFieldTouched])

  const getFieldProps = useCallback(
    (name: string) => {
      const error = _.get(errors, name)
      const touchedField = _.get(touched, name)

      return {
        name,
        label: t(`form.${name}`),
        value: _.get(values, name),
        onChange: (...params: any[]) => {
          handleChange(params[0])
          debouncedValidateField(name)
        },
        onBlur: handleBlur,
        error: !!(touchedField && error),
        helperText: touchedField && error ? i18n.t(error) : '',
      }
    },
    [handleChange, values, setFieldValue, errors, touched, i18n]
  )

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t('edition.title')} onClose={onClose} />
      <DrawerContent>
        <form onSubmit={handleSubmit} noValidate>
          <TextField sx={{ mr: 2 }} {...getFieldProps('name')} />
          <TextField sx={{ mr: 2 }} {...getFieldProps('trafficSourceProviderId')} />
          <CustomAutocomplete
            {...getFieldProps('provider')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('provider', newValue)
            }}
            options={providersOptions}
            creatable={false}
            multiple={false}
          />

          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            height={48}
            py={2}
            position="sticky"
            bottom={32}
            bgcolor="white"
          >
            <Button variant="contained" color="primary" type="submit" disabled={!isValid} fullWidth>
              {t('save')}
            </Button>
            <Button variant="outlined" color="primary" onClick={onClose} fullWidth>
              {t('cancel')}
            </Button>
          </Stack>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default TrafficSourceEdition
