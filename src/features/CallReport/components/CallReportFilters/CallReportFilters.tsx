import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import CallReportFiltersSchema from 'src/features/CallReport/schema/CallReportFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import useData from 'hooks/useData.tsx'
import currentDate from 'utils/currentDate.ts'

export interface CallReportListFiltersFormValues {
  offers: Option[]
  pubId: Option[]
  pubIdYp: Option[]
  state: Option[]
  trafficSource: string
  buyers: Option[]
  issueType: Option[]
  callIssues: string
  startDate: Date | null
  endDate: Date | null
  status: string
  insurance: string
  phone: string
  terminatingPhone: string
  didTd: string
  account: string
  name: string
  email: string
  type_out: string
  vendor: string
}

interface CallReportFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: CallReportListFiltersFormValues
}

export const DEFAULT_FILTERS = {
  offers: [],
  pubId: [],
  state: [],
  trafficSource: '',
  buyers: [],
  issueType: [],
  pubIdYp: [],
  callIssues: '',
  startDate: currentDate(),
  endDate: currentDate(),
  status: '',
  insurance: '',
  phone: '',
  terminatingPhone: '',
  didTd: '',
  account: '',
  name: '',
  email: '',
  type_out: '',
  vendor: '',
}

const CallReportFilters: FC<CallReportFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.filters' })
  const {
    stateOptions,
    trafficSourceOptions,
    issueTypeOptions,
    offersOptions,
    callIssuesOptions,
    insuranceOptions,
    statusOptions,
  } = useData()

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
          <TextField label={t('phone')} fullWidth {...getFieldProps('phone')} />
          <TextField
            label={t('terminatingPhone')}
            fullWidth
            {...getFieldProps('terminatingPhone')}
          />
          <TextField label={t('didTd')} fullWidth {...getFieldProps('didTd')} />
          <CustomAutocomplete
            options={offersOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('offers', newValue)
            }}
            label={t('offers')}
            value={values.offers}
            placeholder={t('selectOrAdd')}
          />
          <Select
            label={t('trafficSource')}
            options={entitiesToOptions(trafficSourceOptions, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('trafficSource')}
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
            resourceName="buyers"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('buyers', newValue)
            }}
            label={t('buyers')}
            value={values.buyers}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
            options={issueTypeOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('issueType', newValue)
            }}
            label={t('issueType')}
            value={values.issueType}
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
          <CustomAutocomplete
            resourceName="pubs"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubIdYp', newValue)
            }}
            label={t('pubIdYp')}
            value={values.pubIdYp}
            placeholder={t('selectOrAdd')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default CallReportFilters
