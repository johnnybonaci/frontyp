import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import _ from 'lodash'

import ProvidersSchema, {
  EMPTY_PROVIDERS,
} from 'features/Settings/schema/Providers/ProvidersSchema'
import { useProvidersEdition } from 'features/Settings/hooks/Providers/useProvidersEdition'
import { ProvidersForm, ProvidersItem } from 'features/Settings/types/Providers'
import { providersToForm } from 'features/Settings/transformers/Providers'

import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'

import useFetchYesNoStatusOptions from 'hooks/useFetchYesNoStatusOptions'
import Select from 'components/Select'

interface ProvidersEditionProps {
  open: boolean
  onClose: () => void
  providers?: ProvidersItem
}

function ProvidersEdition({ open, onClose, providers }: ProvidersEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.providers' })
  const { onSubmit } = useProvidersEdition(providers?.id)
  const { yesNoStatusOptions } = useFetchYesNoStatusOptions()

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
  } = useFormik<ProvidersForm>({
    initialValues: EMPTY_PROVIDERS,
    validateOnChange: false,
    validationSchema: ProvidersSchema,
    onSubmit: (data) => {
      onSubmit(data).then(() => onClose())
    },
  })

  useEffect(() => {
    if (providers) {
      resetForm({
        values: providersToForm(providers),
      })
    }
  }, [providers])

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
          <Stack>
            <TextField fullWidth {...getFieldProps('name')} />
            <TextField fullWidth {...getFieldProps('service')} />
            <TextField fullWidth {...getFieldProps('url')} />
            <TextField fullWidth {...getFieldProps('apiKey')} type="password" />
            <Select options={yesNoStatusOptions} {...getFieldProps('active')} />
          </Stack>

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

export default ProvidersEdition
