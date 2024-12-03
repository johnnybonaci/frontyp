import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { PhoneRoomForm, PhoneRoomItem } from 'features/Settings/types/PhoneRoom'
import { useFormik } from 'formik'
import PhoneRoomSchema, {
  EMPTY_PHONE_ROOM,
} from 'features/Settings/schema/PhoneRoom/PhoneRoomSchema'
import { usePhoneRoomEdition } from 'features/Settings/hooks/PhoneRoom/usePhoneRoomEdition'
import { phoneRoomsToForm } from 'features/Settings/transformers/PhoneRoom'
import _ from 'lodash'
import Select from 'components/Select'
import useFetchYesNoStatusOptions from 'hooks/useFetchYesNoStatusOptions'

interface PhoneRoomEditionProps {
  open: boolean
  onClose: () => void
  phoneRoom?: PhoneRoomItem
}

function PhoneRoomEdition({ open, onClose, phoneRoom }: PhoneRoomEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom' })
  const { onSubmit } = usePhoneRoomEdition(phoneRoom?.id)
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
  } = useFormik<PhoneRoomForm>({
    initialValues: EMPTY_PHONE_ROOM,
    validateOnChange: false,
    validationSchema: PhoneRoomSchema,
    onSubmit,
  })

  useEffect(() => {
    if (phoneRoom) {
      resetForm({
        values: phoneRoomsToForm(phoneRoom),
      })
    }
  }, [phoneRoom])

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
            <TextField fullWidth {...getFieldProps('apiKey')} type="password" />
            <TextField fullWidth {...getFieldProps('apiUser')} type="password" />
            <TextField fullWidth {...getFieldProps('envKey')} />
            <TextField fullWidth {...getFieldProps('listId')} />
            <TextField fullWidth {...getFieldProps('envUser')} />
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

export default PhoneRoomEdition
