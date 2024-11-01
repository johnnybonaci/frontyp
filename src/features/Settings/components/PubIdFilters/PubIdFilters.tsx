import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import PubIdFiltersSchema from 'src/features/Settings/schema/PubIdFiltersSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'

interface PubIdFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const DEFAULT_FILTERS = {
  pubId: [],
  trafficSource: '',
  subId: [],
  leadsType: [],
  startDate: null,
  endDate: null,
  status: '',
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  campaign: '',
}

const PubIdFilters: FC<PubIdFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PubIdFiltersSchema,
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
    }),
    [handleChange, values, initialFilters, setFieldValue]
  )

  useEffect(() => {
    void setValues(initialFilters)
  }, [initialFilters, setValues])

  return (
    <FilterWrapper
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <TextField label={t('pubs')} fullWidth {...getFieldProps('pubs')} />
          <TextField label={t('name')} fullWidth {...getFieldProps('name')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default PubIdFilters
