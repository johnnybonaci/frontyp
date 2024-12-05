import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import Filters from 'src/components/Filters/index.ts'
import CustomDateRangePicker from 'components/CustomDateRangePicker'
import { TextField } from '@mui/material'
import CPCReportFiltersSchema from 'features/CPCReport/schema/CPCReportFiltersSchema.ts'

export interface CPCReportListFiltersFormValues {
  ip: string
  campaign: string
  startDate: Date | null
  endDate: Date | null
}

interface CPCReportFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: CPCReportListFiltersFormValues
}

export const DEFAULT_FILTERS: CPCReportListFiltersFormValues = {
  ip: '',
  campaign: '',
  startDate: null,
  endDate: null,
}

const CPCReportFilters: FC<CPCReportFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CPCReport.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: CPCReportFiltersSchema,
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
          <TextField label={t('ip')} {...getFieldProps('ip')} />
          <TextField label={t('campaign')} {...getFieldProps('campaign')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default CPCReportFilters
