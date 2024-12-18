import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import RoleFiltersSchema from 'src/features/Roles/schema/RoleFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import { type RoleListFiltersFormValues } from 'features/Roles/types'
import { TextField } from '@mui/material'

interface RoleFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: RoleListFiltersFormValues
}

export const DEFAULT_FILTERS: RoleListFiltersFormValues = {
  email: '',
  type: '',
  pubId: '',
  roleName: '',
  vendors: '',
}

const RoleFilters: FC<RoleFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Role.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: RoleFiltersSchema,
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
          <TextField label={t('roleName')} {...getFieldProps('roleName')} />
          <TextField label={t('vendors')} {...getFieldProps('vendors')} />
          <TextField label={t('roleName')} {...getFieldProps('roleName')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default RoleFilters
