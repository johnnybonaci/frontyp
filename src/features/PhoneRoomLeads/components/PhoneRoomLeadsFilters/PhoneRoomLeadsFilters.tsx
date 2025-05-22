import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import Filters from 'src/components/Filters/index.ts'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import { TextField } from '@mui/material'
import PhoneRoomLeadsFiltersSchema from 'features/PhoneRoomLeads/schema/PhoneRoomLeadsFiltersSchema.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import useData from 'hooks/useData.tsx'
import Select from 'components/Select'
import entitiesToOptions from 'utils/entityToOptions.ts'
import currentDate from 'utils/currentDate'

export interface PhoneRoomLeadsFiltersFormValues {
  phone: string
  firstName: string
  pubId: []
  subId: Option | null
  email: string
  status: string
  leadsType: Option | null
  startDate: Date | null
  endDate: Date | null
  campaign: Option | null
}

interface PhoneRoomLeadsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: PhoneRoomLeadsFiltersFormValues
}

export const ALL_PHONE_ROOM_LEAD_OPTION = 'all'

export const PHONE_ROOM_LEAD_STATUS_OPTIONS = [
  { id: '2', title: 'Reject' },
  { id: '1', title: 'Sent' },
  { id: ALL_PHONE_ROOM_LEAD_OPTION, title: 'All Leads' },
]

export const DEFAULT_FILTERS: PhoneRoomLeadsFiltersFormValues = {
  phone: '',
  firstName: '',
  email: '',
  subId: null,
  pubId: [],
  campaign: null,
  leadsType: null,
  status: '',
  startDate: currentDate(),
  endDate: currentDate(),
}

const PhoneRoomLeadsFilters: FC<PhoneRoomLeadsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomLeads.filters' })
  const { leadTypeOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PhoneRoomLeadsFiltersSchema,
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
          <TextField label={t('phone')} {...getFieldProps('phone')} />
          <TextField label={t('firstName')} {...getFieldProps('firstName')} />
          <TextField label={t('email')} {...getFieldProps('email')} />
          <CustomAutocomplete
            options={leadTypeOptions}
            multiple={false}
            creatable={false}
            label={t('leadsType')}
            {...getFieldProps('leadsType')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('leadsType', newValue)
            }}
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
          <Select
            label={t('status')}
            options={entitiesToOptions(PHONE_ROOM_LEAD_STATUS_OPTIONS, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('status')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default PhoneRoomLeadsFilters
