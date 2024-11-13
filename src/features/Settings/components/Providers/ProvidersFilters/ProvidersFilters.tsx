import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC } from 'react'
import { useFormik } from 'formik'
import ProvidersFiltersSchema, {
  EMPTY_PROVIDERS_FILTERS,
} from 'features/Settings/schema/Providers/ProvidersFilterSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'
import Select from 'components/Select'
import useFetchYesNoStatusOptions from 'hooks/useFetchYesNoStatusOptions'

interface ProvidersFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const ProvidersFilters: FC<ProvidersFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = EMPTY_PROVIDERS_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.providers.filters' })
  const { yesNoStatusOptions } = useFetchYesNoStatusOptions({ includeAllOption: true })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: { ...EMPTY_PROVIDERS_FILTERS, ...initialFilters },
    validationSchema: ProvidersFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(EMPTY_PROVIDERS_FILTERS)
    onApply(EMPTY_PROVIDERS_FILTERS)
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

  return (
    <FilterWrapper
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <TextField label={t('name')} {...getFieldProps('name')} />
          <TextField label={t('service')} {...getFieldProps('service')} />
          <TextField label={t('url')} {...getFieldProps('url')} />
          <Select label={t('active')} options={yesNoStatusOptions} {...getFieldProps('active')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default ProvidersFilters
