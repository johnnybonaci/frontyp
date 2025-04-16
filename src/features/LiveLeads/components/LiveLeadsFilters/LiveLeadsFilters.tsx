import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import LiveLeadsFiltersSchema from 'src/features/LiveLeads/schema/LiveLeadsFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import useData from 'hooks/useData.tsx'
import { LEAD_STATUS_OPTIONS } from 'hooks/useFetchData.tsx'
import useDate from 'src/hooks/useDate.ts'
export interface LiveLeadsListFiltersFormValues {
  pubId: Option[]
  trafficSource: Option[]
  pubIdYp: Option[]
  leadsType: Option[]
  startDate: Date | null
  endDate: Date | null
  status: string
  phone: string
  firstName: string
  lastName: string
  name: string
  email: string
  campaign: Option | null
}
export const DEFAULT_FILTERS = (date: Date): LiveLeadsListFiltersFormValues => ({
  pubId: [],
  trafficSource: [],
  pubIdYp: [],
  leadsType: [],
  startDate: date,
  endDate: date,
  status: '',
  phone: '',
  firstName: '',
  lastName: '',
  name: '',
  email: '',
  campaign: null,
})

interface LiveLeadsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: LiveLeadsListFiltersFormValues
}

const LiveLeadsFilters: FC<LiveLeadsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'LiveLeads.filters' })
  const { trafficSourceOptions, leadTypeOptions } = useData()
  const { currentDate } = useDate()

  const DEFAULT_FILTERS_2 = useMemo(() => DEFAULT_FILTERS(currentDate), [currentDate])

  const filtersToUse = initialFilters ?? DEFAULT_FILTERS_2

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: filtersToUse,
    validationSchema: LiveLeadsFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(DEFAULT_FILTERS_2)
    onApply(DEFAULT_FILTERS_2)
  }, [DEFAULT_FILTERS_2, setValues])

  const getFieldProps = useCallback(
    (name: string) => ({
      name,
      // @ts-expect-error
      value: values[name],
      onChange: handleChange,
      // @ts-expect-error
      onClear: async () => await setFieldValue(name, DEFAULT_FILTERS_2[name]),
    }),
    [handleChange, values, setFieldValue, DEFAULT_FILTERS_2]
  )

  useEffect(() => {
    void setValues(filtersToUse)
  }, [filtersToUse, setValues])

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
          <TextField label={t('firstName')} fullWidth {...getFieldProps('firstName')} />
          <TextField label={t('lastName')} fullWidth {...getFieldProps('lastName')} />
          <TextField label={t('email')} fullWidth {...getFieldProps('email')} />
          <CustomAutocomplete
            options={trafficSourceOptions}
            {...getFieldProps('trafficSource')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('trafficSource', newValue)
            }}
            label={t('trafficSource')}
            value={values.trafficSource}
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
            resourceName="pubs"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubIdYp', newValue)
            }}
            label={t('pubIdYp')}
            value={values.pubIdYp}
            placeholder={t('selectOrAdd')}
          />
          <CustomAutocomplete
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
            options={entitiesToOptions(LEAD_STATUS_OPTIONS, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('status')}
          />
          <CustomAutocomplete
            creatable={false}
            multiple={false}
            {...getFieldProps('campaign')}
            resourceName="campaigns"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('campaign', newValue)
            }}
            label={t('campaign')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default LiveLeadsFilters
