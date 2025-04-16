import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useMemo } from 'react'
import { useFormik } from 'formik'
import LiveLeadsFiltersSchema from 'src/features/LiveLeads/schema/LiveLeadsFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import useData from 'hooks/useData.tsx'
import { LEAD_STATUS_OPTIONS } from 'hooks/useFetchData.tsx'
import currentDate from 'utils/currentDate.ts'
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

export const DEFAULT_FILTERS: LiveLeadsListFiltersFormValues = {
  pubId: [],
  trafficSource: [],
  pubIdYp: [],
  leadsType: [],
  startDate: currentDate(), // se sobrescribe abajo con hook si hace falta
  endDate: currentDate(),
  status: '',
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  campaign: null,
  name: '',
}

interface LiveLeadsFiltersProps {
  onCancel: () => void
  onApply: (data: LiveLeadsListFiltersFormValues) => void
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

  // Sobreescribimos solo la fecha si initialFilters no fue pasado
  const resolvedInitialFilters = useMemo(() => {
    const base = initialFilters ?? DEFAULT_FILTERS
    return {
      ...base,
      startDate: currentDate,
      endDate: currentDate,
    }
  }, [initialFilters, currentDate])

  const {
    handleChange,
    values,
    setValues,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: resolvedInitialFilters,
    validationSchema: LiveLeadsFiltersSchema,
    onSubmit: onApply,
    enableReinitialize: true, // 🔁 se actualiza si cambia initialValues
  })

  const handleClear = useCallback(async () => {
    const reset = {
      ...DEFAULT_FILTERS,
      startDate: currentDate,
      endDate: currentDate,
    }
    await setValues(reset)
    onApply(reset)
  }, [currentDate, setValues, onApply])

  const getFieldProps = useCallback(
    (name: keyof LiveLeadsListFiltersFormValues) => ({
      name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      value: values[name],
      onChange: handleChange,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      onClear: async () => {
        const defaultValue = {
          ...DEFAULT_FILTERS,
          startDate: currentDate,
          endDate: currentDate,
        }[name]
        await setFieldValue(name, defaultValue)
      },
    }),
    [handleChange, values, setFieldValue, currentDate]
  )

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
            value={values.campaign ?? null}

          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default LiveLeadsFilters