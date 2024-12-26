import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import Filters from 'src/components/Filters/index.ts'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import { TextField } from '@mui/material'
import PhoneRoomReportsFiltersSchema from 'features/PhoneRoomReports/schema/PhoneRoomReportsFiltersSchema.ts'
import entitiesToOptions from 'utils/entityToOptions.ts'
import Select from 'components/Select'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import useData from 'hooks/useData.tsx'

export interface PhoneRoomReportsListFiltersFormValues {
  phone: string
  category: string
  phoneRoom: string
  leadsType: Option[]
  pubId: Option[]
  startDate: Date | null
  endDate: Date | null
}

interface PhoneRoomReportsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: PhoneRoomReportsListFiltersFormValues
}

export const ALL_CATEGORY_OPTION = 'all'

export const CATEGORY_OPTIONS = [
  { id: '1', title: 'Transfer' },
  { id: '2', title: 'Contact' },
  { id: '3', title: 'No Answer' },
  { id: ALL_CATEGORY_OPTION, title: 'All Category' },
]

export const PHONE_ROOM_OPTIONS = [{ id: '2', title: 'TruAlliantCall' }]

export const DEFAULT_FILTERS: PhoneRoomReportsListFiltersFormValues = {
  leadsType: [],
  pubId: [],
  phone: '',
  phoneRoom: PHONE_ROOM_OPTIONS[0].id,
  category: '',
  startDate: new Date(),
  endDate: new Date(),
}

const PhoneRoomReportsFilters: FC<PhoneRoomReportsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomReports.filters' })
  const { leadTypeOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PhoneRoomReportsFiltersSchema,
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
          <Select
            label={t('phoneRoom')}
            options={entitiesToOptions(PHONE_ROOM_OPTIONS, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            disabled
            {...getFieldProps('phoneRoom')}
          />
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
            resourceName="pubs"
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubId', newValue)
            }}
            label={t('pubId')}
            value={values.pubId}
            placeholder={t('selectOrAdd')}
          />
          <Select
            label={t('category')}
            options={entitiesToOptions(CATEGORY_OPTIONS, {
              fieldValue: 'id',
              fieldLabel: 'title',
            })}
            fullWidth
            {...getFieldProps('category')}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default PhoneRoomReportsFilters
