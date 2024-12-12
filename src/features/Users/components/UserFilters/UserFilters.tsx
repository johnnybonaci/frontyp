import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import UserFiltersSchema from 'src/features/Users/schema/UserFiltersSchema'
import Filters from 'src/components/Filters/index.ts'
import CustomAutocomplete, {
  type Option,
} from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import useData from 'hooks/useData.tsx'
import Select from 'components/Select'
import entitiesToOptions from 'utils/entityToOptions'

export interface UserListFiltersFormValues {
  viewBy?: string
  pubIdTD?: Option[]
  ccId?: Option[]
  startDate: Date | null
  endDate: Date | null
  type?: Option[]
  trafficSourceTD?: Option[]
  pubIdYp?: Option[]
  campaignYP?: string
}

interface UserFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: UserListFiltersFormValues
}

export const DEFAULT_FILTERS: UserListFiltersFormValues = {
  viewBy: '',
  pubIdTD: [],
  ccId: [],
  startDate: null,
  endDate: null,
  type: [],
  trafficSourceTD: [],
  pubIdYp: [],
}

const UserFilters: FC<UserFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'User.filters' })
  const { trafficSourceOptions, offersOptions, campaignOptions } = useData()

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: UserFiltersSchema,
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
            label={t('viewBy')}
            options={[{ name: 'Campaign YP', value: 'leads.sub_id3' }]}
            fullWidth
            {...getFieldProps('viewBy')}
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
          <CustomAutocomplete
            resourceName="pubs"
            {...getFieldProps('pubIdTD')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubIdTD', newValue)
            }}
            label={t('pubIdTD')}
            creatable={false}
          />
          <Select
            label={t('campaignYP')}
            options={entitiesToOptions(campaignOptions, { fieldLabel: 'title', fieldValue: 'id' })}
            fullWidth
            {...getFieldProps('campaignYP')}
          />
          <CustomAutocomplete
            resourceName="pubs"
            {...getFieldProps('ccId')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('ccId', newValue)
            }}
            label={t('ccId')}
            creatable={false}
          />
          <CustomAutocomplete
            options={offersOptions}
            {...getFieldProps('type')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('type', newValue)
            }}
            label={t('type')}
            creatable={false}
          />
          <CustomAutocomplete
            options={trafficSourceOptions}
            {...getFieldProps('trafficSourceTD')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('trafficSourceTD', newValue)
            }}
            label={t('trafficSourceTD')}
            creatable={false}
          />
          <CustomAutocomplete
            resourceName="pubs"
            {...getFieldProps('pubIdYp')}
            onChange={(_event: any, newValue: any[]) => {
              void setFieldValue('pubIdYp', newValue)
            }}
            label={t('pubIdYp')}
            creatable={false}
          />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default UserFilters
