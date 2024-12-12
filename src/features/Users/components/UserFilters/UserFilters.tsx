import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import UserFiltersSchema from 'src/features/Users/schema/UserFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import { type UserListFiltersFormValues } from 'features/Users/types'
import { TextField } from '@mui/material'

interface UserFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: UserListFiltersFormValues
}

export const DEFAULT_FILTERS: UserListFiltersFormValues = {
  email: '',
  type: '',
  pubId: '',
  userName: '',
  vendors: '',
  roleName: '',
}

const UserFilters: FC<UserFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'User.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: UserFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(DEFAULT_FILTERS)
    onApply(DEFAULT_FILTERS)
  }, [initialFilters, setValues])

  const getFieldProps = useCallback(
    (name: string) => ({
      name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      value: values[name],
      onChange: handleChange,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onClear: async () => await setFieldValue(name, DEFAULT_FILTERS[name]),
    }),
    [handleChange, values, initialFilters, setFieldValue]
  )

  useEffect(() => {
    void setValues(initialFilters)
  }, [initialFilters, setValues])

  useEffect(() => {
    onApply(values)
  }, [JSON.stringify(values)])

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <TextField label={t('email')} {...getFieldProps('email')} />
          <TextField label={t('type')} {...getFieldProps('type')} />
          <TextField label={t('pubId')} {...getFieldProps('pubId')} />
          <TextField label={t('userName')} {...getFieldProps('userName')} />
          <TextField label={t('vendors')} {...getFieldProps('vendors')} />
          <TextField label={t('roleName')} {...getFieldProps('roleName')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default UserFilters
