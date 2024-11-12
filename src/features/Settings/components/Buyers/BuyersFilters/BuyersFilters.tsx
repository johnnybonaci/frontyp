import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC } from 'react'
import { useFormik } from 'formik'
import BuyersFiltersSchema, {
  EMPTY_BUYERS_FILTERS,
} from 'features/Settings/schema/Buyers/BuyersFilterSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useFetchProviders from 'hooks/useFetchProviders'

interface BuyersFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const BuyersFilters: FC<BuyersFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = EMPTY_BUYERS_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.buyers.filters' })
  const { providersOptions } = useFetchProviders()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: BuyersFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(EMPTY_BUYERS_FILTERS)
    onApply(EMPTY_BUYERS_FILTERS)
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
          <TextField label={t('buyerProviderId')} {...getFieldProps('buyerProviderId')} />
          <CustomAutocomplete
            label={t('provider')}
            {...getFieldProps('provider')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('provider', newValue)
            }}
            options={providersOptions}
            creatable={false}
            multiple={false}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default BuyersFilters
