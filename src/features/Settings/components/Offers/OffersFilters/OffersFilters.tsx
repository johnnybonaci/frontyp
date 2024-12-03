import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, type FC } from 'react'
import { useFormik } from 'formik'
import OffersFiltersSchema, {
  EMPTY_OFFERS_FILTERS,
} from 'features/Settings/schema/Offers/OffersFiltersSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useFetchProviders from 'hooks/useFetchProviders'

interface OffersFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const OffersFilters: FC<OffersFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = EMPTY_OFFERS_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.offers.filters' })
  const { providersOptions } = useFetchProviders()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: OffersFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(EMPTY_OFFERS_FILTERS)
    onApply(EMPTY_OFFERS_FILTERS)
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
    onApply(values)
  }, [JSON.stringify(values)])

  return (
    <FilterWrapper
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <TextField label={t('name')} {...getFieldProps('name')} />
          <TextField label={t('type')} {...getFieldProps('type')} />
          <TextField label={t('sourceUrl')} {...getFieldProps('sourceUrl')} />
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

export default OffersFilters
