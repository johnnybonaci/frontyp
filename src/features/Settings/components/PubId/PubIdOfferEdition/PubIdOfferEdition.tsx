import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import _ from 'lodash'

import { Button, Drawer, Grid, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { PubIdItem, PubIdOffer, PubIdOfferType } from 'features/Settings/types/PubId'
import PubIdOfferSchema, {
  EMPTY_PUB_ID_OFFER,
} from 'features/Settings/schema/PubId/PubIdOfferSchema'
import { usePubIdOfferEdition } from 'features/Settings/hooks/PubId/usePubIdOfferEdition'
import CustomCheckbox from 'components/CustomCheckbox'

interface PubIdOfferEditionProps {
  open: boolean
  onClose: () => void
  onEditSuccess: () => void
  pub?: PubIdItem
  type?: PubIdOfferType
}

function PubIdOfferEdition({
  open,
  onClose,
  onEditSuccess,
  pub,
  type = 'ACA',
}: PubIdOfferEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.pubId.offerEdition' })
  const pubIdOffer = useMemo(() => (type ? pub?.[type] : undefined), [pub, type])
  const { onSubmit } = usePubIdOfferEdition(pubIdOffer?.id)

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
  } = useFormik<PubIdOffer>({
    initialValues: EMPTY_PUB_ID_OFFER,
    validateOnChange: false,
    validationSchema: PubIdOfferSchema,
    onSubmit: (data) => onSubmit(data as Required<PubIdOffer>, pub!).then(onEditSuccess),
  })

  useEffect(() => {
    resetForm({
      values: pubIdOffer,
    })
  }, [pubIdOffer])

  const debouncedValidateField = useCallback(_.debounce(setFieldTouched, 500), [setFieldTouched])

  const getFieldProps = useCallback(
    (name: string) => {
      const error = _.get(errors, name)
      const touchedField = _.get(touched, name)

      return {
        name,
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
      <DrawerHeader title={t('title', { type, id: pub?.id })} onClose={onClose} />
      <DrawerContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack my={2} spacing={3} sx={{ maxWidth: 400 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <CustomCheckbox
                  label={t('fields.sendToTD')}
                  {...getFieldProps('sendToTD')}
                  onChange={(isChecked: boolean) => {
                    setFieldValue('sendToTD', isChecked)
                    debouncedValidateField('sendToTD')
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                {' '}
                <CustomCheckbox
                  label={t('fields.sendToTrualliant')}
                  {...getFieldProps('sendToTrualliant')}
                  onChange={(isChecked: boolean) => {
                    setFieldValue('sendToTrualliant', isChecked)
                    debouncedValidateField('sendToTrualliant')
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomCheckbox
                  label={t('fields.sendToPhoneRoom2')}
                  {...getFieldProps('sendToPhoneRoom2')}
                  onChange={(isChecked: boolean) => {
                    setFieldValue('sendToPhoneRoom2', isChecked)
                    debouncedValidateField('sendToPhoneRoom2')
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomCheckbox
                  label={t('fields.sendToConvoso')}
                  {...getFieldProps('sendToConvoso')}
                  onChange={(isChecked: boolean) => {
                    setFieldValue('sendToConvoso', isChecked)
                    debouncedValidateField('sendToConvoso')
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomCheckbox
                  label={t('fields.interleave')}
                  {...getFieldProps('interleave')}
                  onChange={(isChecked: boolean) => {
                    setFieldValue('interleave', isChecked)
                    debouncedValidateField('interleave')
                  }}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2}>
              <TextField fullWidth label={t('fields.listId')} {...getFieldProps('listId')} />
              <TextField
                fullWidth
                label={t('fields.campaignId')}
                {...getFieldProps('campaignId')}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label={t('fields.trafficSourceId')}
                {...getFieldProps('trafficSourceId')}
              />
              <TextField
                fullWidth
                label={t('fields.callCenterId')}
                {...getFieldProps('callCenterId')}
              />
            </Stack>
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

export default PubIdOfferEdition
