import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { type RoleForm, type RoleItem } from 'features/Roles/types'
import { useFormik } from 'formik'
import { EMPTY_ROLE, RoleCreationSchema, RoleEditionSchema } from 'features/Roles/schema/RoleSchema'
import { useRoleForm } from 'features/Roles/hooks/useRoleForm'
import { roleToForm } from 'features/Roles/transformers'
import _ from 'lodash'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useData from 'hooks/useData'

interface RolesEditionProps {
  open: boolean
  onClose: () => void
  onEditSuccess: () => void
  role?: RoleItem
}

function RolesForm({ open, onClose, onEditSuccess, role }: RolesEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Role' })
  const { onSubmit } = useRoleForm(role?.id)
  const { leadTypeOptions, pubIdOptions, rolesOptions } = useData()

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
  } = useFormik<RoleForm>({
    initialValues: EMPTY_ROLE,
    validateOnChange: false,
    validationSchema: role?.id ? RoleEditionSchema : RoleCreationSchema,
    onSubmit: (data) => {
      onSubmit(data).then(onEditSuccess)
    },
  })

  useEffect(() => {
    resetForm({
      values: role ? roleToForm(role, leadTypeOptions, pubIdOptions, rolesOptions) : EMPTY_ROLE,
    })
  }, [role])

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
      <DrawerHeader title={t(`${role ? 'edition' : 'creation'}.title`)} onClose={onClose} />
      <DrawerContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack>
            <TextField fullWidth {...getFieldProps('roleName')} />
            <TextField
              fullWidth
              {...getFieldProps('email')}
              type="email"
              InputProps={{ autoComplete: 'email' }}
            />
            <TextField
              fullWidth
              {...getFieldProps('newPassword')}
              type="password"
              InputProps={{ autoComplete: 'new-password' }}
            />
            <TextField
              fullWidth
              {...getFieldProps('newPasswordConfirmation')}
              type="password"
              InputProps={{ autoComplete: 'new-password' }}
            />

            <CustomAutocomplete
              {...getFieldProps('type')}
              onChange={(_event: any, newValue: any[]) => {
                void setFieldValue('type', newValue)
                debouncedValidateField('type')
              }}
              options={leadTypeOptions}
              creatable={false}
              multiple={false}
            />

            <CustomAutocomplete
              {...getFieldProps('pubId')}
              onChange={(_event: any, newValue: any[]) => {
                void setFieldValue('pubId', newValue)
                debouncedValidateField('pubId')
              }}
              options={pubIdOptions}
              creatable={false}
              multiple={false}
            />

            <CustomAutocomplete
              {...getFieldProps('role')}
              onChange={(_event: any, newValue: any[]) => {
                void setFieldValue('role', newValue)
                debouncedValidateField('role')
              }}
              options={rolesOptions}
              creatable={false}
              multiple={false}
            />
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

export default RolesForm
