import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { BuyersForm, BuyersItem } from 'features/Settings/types/Buyers'
import { useFormik } from 'formik'
import BuyersSchema, { EMPTY_BUYERS } from 'features/Settings/schema/Buyers/BuyersSchema'
import { useBuyersEdition } from 'features/Settings/hooks/Buyers/useBuyersEdition'
import { buyersToForm } from 'features/Settings/transformers/Buyers'
import _ from 'lodash'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useFetchProviders from 'hooks/useFetchProviders'

interface BuyersEditionProps {
  open: boolean
  onClose: () => void
  buyers?: BuyersItem
}

function BuyersEdition({ open, onClose, buyers }: BuyersEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.buyers' })
  const { onSubmit } = useBuyersEdition(buyers?.id)
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
  } = useFormik<BuyersForm>({
    initialValues: EMPTY_BUYERS,
    validateOnChange: false,
    validationSchema: BuyersSchema,
    onSubmit,
  })

  useEffect(() => {
    if (buyers) {
      resetForm({
        values: buyersToForm(buyers, providersOptions),
      })
    }
  }, [buyers])

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
          <TextField sx={{ mr: 2 }} {...getFieldProps('buyerProviderId')} />
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

export default BuyersEdition
