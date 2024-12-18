import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Drawer, Stack, TextField, Typography } from '@mui/material'
import DrawerContent from 'components/DrawerContent'
import DrawerHeader from 'components/DrawerHeader'
import { type RoleForm, type RoleItem, type Permission } from 'features/Roles/types'
import { useFormik } from 'formik'
import RoleSchema, { EMPTY_ROLE } from 'features/Roles/schema/RoleSchema'
import { useRoleForm } from 'features/Roles/hooks/useRoleForm'
import { roleToForm } from 'features/Roles/transformers'
import _ from 'lodash'
import CustomCheckbox from 'components/CustomCheckbox'
import useFetchPermissionList from 'features/Roles/hooks/useFetchPermissionList'

interface RolesEditionProps {
  open: boolean
  onClose: () => void
  onEditSuccess: () => void
  role?: RoleItem
}

function RolesForm({ open, onClose, onEditSuccess, role }: RolesEditionProps): React.ReactNode {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Role' })
  const { onSubmit } = useRoleForm(role?.id)
  const { permissionItems } = useFetchPermissionList()

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
    validationSchema: RoleSchema,
    onSubmit: (data) => {
      onSubmit(data).then(onEditSuccess)
    },
  })

  useEffect(() => {
    resetForm({
      values: role ? roleToForm(role) : EMPTY_ROLE,
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

  const handlePermissionChange = (permissionName: Permission) => {
    let newPermissions = []

    if (values.permissions.includes(permissionName)) {
      newPermissions = values.permissions.filter((p) => p !== permissionName)
    } else {
      newPermissions = [...values.permissions, permissionName]
    }

    setFieldValue('permissions', newPermissions)
    debouncedValidateField('permissions')
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t(`${role ? 'edition' : 'creation'}.title`)} onClose={onClose} />
      <DrawerContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField {...getFieldProps('name')} />
            <Stack alignItems="left" spacing={1}>
              <Typography variant="subtitle1">{t('form.permissions')}</Typography>
              {permissionItems?.map((permissionName) => (
                <CustomCheckbox
                  key={permissionName}
                  value={Boolean(values.permissions.includes(permissionName))}
                  onChange={() => handlePermissionChange(permissionName)}
                  label={t(`form.permissionsList.${permissionName}`)}
                />
              ))}
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

export default RolesForm
