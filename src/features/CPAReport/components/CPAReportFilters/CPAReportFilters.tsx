import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import CallReportFiltersSchema from 'src/features/CallReport/schema/CallReportFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import useData from "hooks/useData.tsx";

export interface CPAReportListFiltersFormValues {
  pubId: Option[]
  subId: Option | null
  state: Option[]
  trafficSource: Option[]
  buyers: Option[]
  leadsType: Option[]
  startDate: Date | null
  endDate: Date | null
  viewBy: Option | null
}

interface CPAReportFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: CPAReportListFiltersFormValues
}

export const VIEW_BY_OPTIONS: Option[] = [
  { id: 'convertions.traffic_source_id', title: 'Traffic Source' },
  { id: 'convertions.buyer_id', title: 'Buyers' },
]

const DEFAULT_FILTERS: CPAReportListFiltersFormValues = {
  pubId: [],
  subId: null,
  state: [],
  trafficSource: [],
  buyers: [],
  leadsType: [],
  startDate: null,
  endDate: null,
  viewBy: VIEW_BY_OPTIONS[0],
}

const CPAReportFilters: FC<CPAReportFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CPAReport.filters' })
  const { stateOptions, trafficSourceOptions, leadTypeOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: CallReportFiltersSchema,
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

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <CustomDateRangePicker
            label={t('date')}
            value={[values.startDate ?? undefined, values.endDate ?? undefined]}
            onChange={(e: any) => {
              void setFieldValue('startDate', e[0])
              void setFieldValue('endDate', e[1])
            }}
          />
          <CustomAutocomplete
            options={trafficSourceOptions}
            {...getFieldProps('trafficSource')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('trafficSource', newValue)
            }}
            label={t('trafficSource')}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            resourceName="pubs"
            {...getFieldProps('pubId')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubId', newValue)
            }}
            label={t('pubId')}
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
          <CustomAutocomplete
            resourceName="buyers"
            {...getFieldProps('buyers')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('buyers', newValue)
            }}
            label={t('buyers')}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            options={leadTypeOptions}
            {...getFieldProps('leadsType')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('leadsType', newValue)
            }}
            label={t('leadsType')}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            options={stateOptions}
            {...getFieldProps('state')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('state', newValue)
            }}
            label={t('state')}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            creatable={false}
            multiple={false}
            options={VIEW_BY_OPTIONS}
            {...getFieldProps('viewBy')}
            onChange={(_event: any, newValue: any) => {
              void setFieldValue('viewBy', newValue)
            }}
            label={t('viewBy')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default CPAReportFilters
