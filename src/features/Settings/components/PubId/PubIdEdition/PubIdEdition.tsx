import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, IconButton, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { PubIdForm, PubIdItem } from 'features/Settings/types'
import { AddCircleOutlineOutlined, DeleteOutlined } from '@mui/icons-material'
import { generateUniqueId } from 'utils/utils'
import { useFormik } from 'formik'
import PubIdSchema, { EMPTY_PUBID } from 'features/Settings/schema/PubId/PubIdSchema'
import { usePubIdEdition } from 'features/Settings/hooks/PubId/usePubIdEdition'
import { pubIdsToForm } from 'features/Settings/transformers/PubId'
import CustomAutocomplete, { Option } from 'components/CustomAutocomplete/CustomAutocomplete'
import useFetchUsers from 'hooks/useFetchUsers'
import _ from 'lodash'

interface PubIdEditionProps {
  open: boolean
  onClose: () => void
  pub?: PubIdItem
}

const EMPTY_PUB_USER = { name: '', cpl: 0 }

function PubIdEdition({ open, onClose, pub }: PubIdEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Settings.pubId' })
  const { onSubmit } = usePubIdEdition(pub?.id)
  const { userOptions } = useFetchUsers()

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
  } = useFormik<PubIdForm>({
    initialValues: EMPTY_PUBID,
    validateOnChange: false,
    validationSchema: PubIdSchema,
    onSubmit,
  })

  useEffect(() => {
    if (pub) {
      resetForm({
        values: pubIdsToForm(pub, userOptions),
      })
    }
  }, [pub])

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

  const handleAddUser = () => {
    setFieldValue('form', [...values.form, { id: generateUniqueId(), ...EMPTY_PUB_USER }])
  }

  const handleUserChange = (index: number, value: Option) => {
    const newUsers = [...values.form]
    newUsers[index].user = value
    setFieldValue('form', newUsers)
  }

  const handleCplChange = (index: number, value: string) => {
    const newUsers = [...values.form]
    newUsers[index].cpl = value
    setFieldValue('form', newUsers)
  }

  const handleDeleteUser = (index: number) => {
    const newUsers = [...values.form]
    newUsers.splice(index, 1)
    setFieldValue('form', newUsers)
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{ position: 'relative' }}
      variant="persistent"
    >
      <DrawerHeader title={t('edition.title')} onClose={onClose} />
      <DrawerContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack direction="row" alignItems="end" mb={2}>
            <TextField sx={{ mr: 2 }} {...getFieldProps('name')} />
            <Button
              startIcon={<AddCircleOutlineOutlined />}
              variant="contained"
              color="primary"
              onClick={handleAddUser}
            >
              {t('addCpl')}
            </Button>
          </Stack>

          <Stack flex={1} spacing={2} mb={2}>
            {values.form.map((user, index) => (
              <Stack key={user.keyu} direction="row" alignItems="start" spacing={2}>
                <CustomAutocomplete
                  sx={{ flex: 2 }}
                  label={t('fields.user')}
                  creatable={false}
                  multiple={false}
                  options={userOptions}
                  {...getFieldProps(`form.${index}.user`)}
                  onChange={(_: any, newValue: any) => {
                    handleUserChange(index, newValue as Option)
                    debouncedValidateField(`form.${index}.user`)
                  }}
                />
                <TextField
                  sx={{ flex: 1 }}
                  label={t('fields.cpl')}
                  type="number"
                  {...getFieldProps(`form.${index}.cpl`)}
                  onChange={(e) => handleCplChange(index, e.target.value)}
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDeleteUser(index)
                    debouncedValidateField(`form.${index}.user`)
                    debouncedValidateField(`form.${index}.user`)
                  }}
                  aria-label="delete"
                  sx={{ mb: 2, alignSelf: 'start', top: 32 }}
                >
                  <DeleteOutlined sx={{ width: 24, height: 24 }} />
                </IconButton>
              </Stack>
            ))}
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

export default PubIdEdition
