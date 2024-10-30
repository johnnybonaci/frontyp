import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import ActiveLeadsFiltersSchema from 'src/features/ActiveLeads/schema/ActiveLeadsFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import MultiSelect, { type Option } from 'components/MultiSelect/MultiSelect.tsx'
import useFetchData from 'hooks/useFetchData.tsx'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import CustomDateRangePicker from 'components/CustomDateRangePicker'

export interface ActiveLeadsListFiltersFormValues {
  pubId: Option[]
  trafficSource: string
  subId: Option[]
  leadsType: Option[]
  startDate: Date | null
  endDate: Date | null
  status: string
  phone: string
  firstName: string
  lastName: string
  name: string
  email: string
  campaign: string
}

interface ActiveLeadsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: ActiveLeadsListFiltersFormValues
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

const ActiveLeadsFilters: FC<ActiveLeadsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ActiveLeads.filters' })
  const {
    subIdOptions,
    trafficSourceOptions,
    statusOptions,
    pubIdOptions,
    campaignOptions,
    leadTypeOptions,
  } = useFetchData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: ActiveLeadsFiltersSchema,
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
          <TextField label={t('phone')} fullWidth {...getFieldProps('phone')} />
          <TextField label={t('firstName')} fullWidth {...getFieldProps('firstName')} />
          <TextField label={t('lastName')} fullWidth {...getFieldProps('lastName')} />
          <TextField label={t('email')} fullWidth {...getFieldProps('email')} />
          <Select
            label={t('trafficSource')}
            options={entitiesToOptions(trafficSourceOptions, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('trafficSource')}
          />
          <MultiSelect
            options={pubIdOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubId', newValue)
            }}
            label={t('pubId')}
            value={values.pubId}
            placeholder={t('selectOrAdd')}
          />
          <MultiSelect
            options={subIdOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('subId', newValue)
            }}
            label={t('subId')}
            value={values.subId}
            placeholder={t('selectOrAdd')}
          />
          <MultiSelect
            options={leadTypeOptions}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('leadsType', newValue)
            }}
            label={t('leadsType')}
            value={values.leadsType}
            placeholder={t('selectOrAdd')}
          />
          <Select
            label={t('status')}
            options={entitiesToOptions(statusOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('status')}
          />
          <Select
            label={t('campaign')}
            options={entitiesToOptions(campaignOptions, { fieldValue: 'id', fieldLabel: 'title' })}
            fullWidth
            {...getFieldProps('campaign')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default ActiveLeadsFilters
