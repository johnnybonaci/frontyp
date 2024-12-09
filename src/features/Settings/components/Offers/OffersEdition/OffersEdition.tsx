import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { OffersForm, OffersItem } from 'features/Settings/types/Offers'
import { useFormik } from 'formik'
import OffersSchema, { EMPTY_OFFERS } from 'features/Settings/schema/Offers/OffersSchema'
import { useOffersEdition } from 'features/Settings/hooks/Offers/useOffersEdition'
import { offersToForm } from 'features/Settings/transformers/Offers'
import _ from 'lodash'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useData from 'hooks/useData'

interface OffersEditionProps {
  open: boolean
  onClose: () => void
  offers?: OffersItem
}

function OffersEdition({ open, onClose, offers }: OffersEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.offers' })
  const { onSubmit } = useOffersEdition(offers?.id)
  const { providersOptions, leadTypeOptions } = useData()

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
  } = useFormik<OffersForm>({
    initialValues: EMPTY_OFFERS,
    validateOnChange: false,
    validationSchema: OffersSchema,
    onSubmit: (data) => {
      onSubmit(data).then(() => onClose())
    },
  })

  useEffect(() => {
    if (offers) {
      resetForm({
        values: offersToForm(offers),
      })
    }
  }, [offers])

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
          <TextField fullWidth sx={{ mr: 2 }} {...getFieldProps('name')} />
          <CustomAutocomplete
            {...getFieldProps('type')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('type', newValue)
            }}
            options={leadTypeOptions}
            creatable={false}
            multiple={false}
          />
          <TextField fullWidth sx={{ mr: 2 }} {...getFieldProps('sourceUrl')} />
          <CustomAutocomplete
            {...getFieldProps('provider')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('provider', newValue)
            }}
            options={providersOptions}
            creatable={false}
            multiple={false}
          />
          <TextField fullWidth sx={{ mr: 2 }} type="password" {...getFieldProps('apiKey')} />

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

export default OffersEdition
