import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import Filters from 'src/components/Filters/index.ts'
import PhoneRoomPerformanceFiltersSchema from 'features/PhoneRoomPerformance/schema/PhoneRoomPerformanceFiltersSchema.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import useData from 'hooks/useData.tsx'

export interface PhoneRoomPerformanceListFiltersFormValues {
  leadsType: Option[]
  pubId: Option[]
  subId: Option | null
}

interface PhoneRoomPerformanceFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: PhoneRoomPerformanceListFiltersFormValues
}

export const DEFAULT_FILTERS: PhoneRoomPerformanceListFiltersFormValues = {
  leadsType: [],
  pubId: [],
  subId: null,
}

const PhoneRoomPerformanceFilters: FC<PhoneRoomPerformanceFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomPerformance.filters' })
  const { leadTypeOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PhoneRoomPerformanceFiltersSchema,
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
          <CustomAutocomplete
            options={leadTypeOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('leadsType', newValue)
            }}
            label={t('leadsType')}
            value={values.leadsType}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            resourceName="pubs"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubId', newValue)
            }}
            label={t('pubId')}
            value={values.pubId}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            creatable={false}
            multiple={false}
            resourceName="subs"
            {...getFieldProps('subId')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('subId', newValue)
            }}
            label={t('subId')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default PhoneRoomPerformanceFilters
