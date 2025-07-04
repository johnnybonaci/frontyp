import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import _ from 'lodash'

import DidNumberSchema, { EMPTY_BUYERS } from 'features/Settings/schema/DidNumber/DidNumberSchema'
import { useDidNumberEdition } from 'features/Settings/hooks/DidNumber/useDidNumberEdition'
import { DidNumberForm, DidNumberItem } from 'features/Settings/types/DidNumber'
import { didNumberToForm } from 'features/Settings/transformers/DidNumber'

import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'

import useData from 'hooks/useData'
import useFetchPubIdsByOfferOptions from 'features/Settings/hooks/PubId/useFetchPubIdsByOfferOptions'

interface DidNumberEditionProps {
  open: boolean
  onClose: () => void
  onEditSuccess: () => void
  didNumber?: DidNumberItem
}

function DidNumberEdition({
  open,
  onClose,
  onEditSuccess,
  didNumber,
}: DidNumberEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.didNumber' })
  const { onSubmit } = useDidNumberEdition(didNumber?.id)
  const { subIdOptions, trafficSourceOptions, offersOptions, pubIdOptions } = useData()

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
  } = useFormik<DidNumberForm>({
    initialValues: EMPTY_BUYERS,
    validateOnChange: false,
    validationSchema: DidNumberSchema,
    onSubmit: (data) => {
      onSubmit(data).then(onEditSuccess)
    },
  })

  const { pubIdsByOfferOptions } = useFetchPubIdsByOfferOptions(values.offer?.id)

  useEffect(() => {
    if (didNumber) {
      resetForm({
        values: didNumberToForm(didNumber, subIdOptions, pubIdOptions),
      })
    }
  }, [didNumber])

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
          <TextField fullWidth {...getFieldProps('description')} />
          <CustomAutocomplete
            {...getFieldProps('sub')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('sub', newValue)
            }}
            options={subIdOptions}
            creatable={false}
            multiple={false}
          />
          <TextField fullWidth {...getFieldProps('campaignName')} />
          <CustomAutocomplete
            {...getFieldProps('trafficSource')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('trafficSource', newValue)
              debouncedValidateField('trafficSource')
            }}
            options={trafficSourceOptions}
            creatable={false}
            multiple={false}
          />
          <CustomAutocomplete
            {...getFieldProps('offer')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('offer', newValue)
              void setFieldValue('pub', null)
              debouncedValidateField('offer')
            }}
            options={offersOptions}
            creatable={false}
            multiple={false}
          />
          <CustomAutocomplete
            {...getFieldProps('pub')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pub', newValue)
              debouncedValidateField('pub')
            }}
            options={pubIdsByOfferOptions}
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

export default DidNumberEdition
