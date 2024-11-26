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
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'

export interface QAReportListFiltersFormValues {
  pubId: Option[]
  pubIdYp: Option[]
  insurance: string
  issueType: Option[]
  subId: Option | null
  trafficSource: Option[]
  buyers: Option[]
  state: Option[]
  callIssues: string
  offers: Option[]
  status: string
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

export const DEFAULT_FILTERS: QAReportListFiltersFormValues = {
  pubId: [],
  subId: null,
  trafficSource: [],
  buyers: [],
  offers: [],
  pubIdYp: [],
  callIssues: '',
  issueType: [],
  insurance: '',
  state: [],
  status: '',
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
  const {
    trafficSourceOptions,
    offersOptions,
    stateOptions,
    statusOptions,
    callIssuesOptions,
    insuranceOptions,
    issueTypeOptions,
  } = useData()

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
            withShortcuts
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
            resourceName="pubs"
            {...getFieldProps('pubIdYp')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubIdYp', newValue)
            }}
            label={t('pubIdYp')}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            options={stateOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('state', newValue)
            }}
            label={t('state')}
            value={values.state}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            options={offersOptions}
            {...getFieldProps('offers')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('offers', newValue)
            }}
            label={t('offers')}
            placeholder={t('selectOrAdd')}
          />
          <TextField label={t('phone')} {...getFieldProps('phone')} onChange={handleChange} />
          <CustomAutocomplete
            options={issueTypeOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('issueType', newValue)
            }}
            label={t('issueType')}
            value={values.issueType}
            placeholder={t('selectOrAdd')}
          />
          <Select
            label={t('callIssues')}
            options={entitiesToOptions(callIssuesOptions, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('callIssues')}
          />
          <Select
            label={t('insurance')}
            options={entitiesToOptions(insuranceOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('insurance')}
          />
          <Select
            label={t('status')}
            options={entitiesToOptions(statusOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('status')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default QAReportFilters
