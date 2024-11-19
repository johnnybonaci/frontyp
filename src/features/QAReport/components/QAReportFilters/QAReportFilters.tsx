import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import QAReportFiltersSchema from 'src/features/QAReport/schema/QAReportFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import { TextField } from '@mui/material'
import useData from 'hooks/useData.tsx'

export interface QAReportListFiltersFormValues {
  pubId: Option[]
  subId: Option | null
  trafficSource: Option[]
  buyers: Option[]
  leadsType: Option[]
  startDate: Date | null
  endDate: Date | null
  phone: string
}

interface QAReportFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: QAReportListFiltersFormValues
}

const DEFAULT_FILTERS: QAReportListFiltersFormValues = {
  pubId: [],
  subId: null,
  trafficSource: [],
  buyers: [],
  leadsType: [],
  startDate: null,
  endDate: null,
  phone: '',
}

const QAReportFilters: FC<QAReportFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'QAReport.filters' })
  const { trafficSourceOptions, leadTypeOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: QAReportFiltersSchema,
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
          <TextField label={t('phone')} {...getFieldProps('phone')} onChange={handleChange} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default QAReportFilters
