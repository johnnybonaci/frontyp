import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, type FC } from 'react'
import { useFormik } from 'formik'
import DidNumberFiltersSchema, {
  EMPTY_BUYERS_FILTERS,
} from 'features/Settings/schema/DidNumber/DidNumberFilterSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'
import CustomAutocomplete from 'components/CustomAutocomplete/CustomAutocomplete'
import useData from 'hooks/useData'

interface DidNumberFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const DidNumberFilters: FC<DidNumberFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = EMPTY_BUYERS_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.didNumber.filters' })
  const { trafficSourceOptions, offersOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: DidNumberFiltersSchema,
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
          <TextField label={t('id')} {...getFieldProps('id')} />
          <TextField label={t('description')} {...getFieldProps('description')} />
          <TextField label={t('subId')} {...getFieldProps('subId')} />
          <TextField label={t('pubId')} {...getFieldProps('pubId')} />
          <CustomAutocomplete
            label={t('trafficSource')}
            {...getFieldProps('trafficSource')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('trafficSource', newValue)
            }}
            options={trafficSourceOptions}
            creatable={false}
            multiple={false}
          />
          <CustomAutocomplete
            label={t('offer')}
            {...getFieldProps('offer')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('offer', newValue)
            }}
            options={offersOptions}
            creatable={false}
            multiple={false}
          />
          <TextField label={t('campaignName')} {...getFieldProps('campaignName')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default DidNumberFilters
