import { useTranslation } from 'react-i18next'
import { useCallback, type FC, useEffect } from 'react'
import { useFormik } from 'formik'
import ReportLeadsFiltersSchema from 'src/features/ReportLeads/schema/ReportLeadsFiltersSchema'
import Filters from 'src/components/Filters/index.ts'

import CustomDateRangePicker from 'components/CustomDateRangePicker'
import currentDate from 'utils/currentDate.ts'

export interface ReportLeadsListFiltersFormValues {
  startDate: Date | null
  endDate: Date | null
}

interface ReportLeadsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: ReportLeadsListFiltersFormValues
}

export const DEFAULT_FILTERS = {
  startDate: currentDate(),
  endDate: currentDate(),
}

const ReportLeadsFilters: FC<ReportLeadsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ReportLeads.filters' })

  const { values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: ReportLeadsFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(DEFAULT_FILTERS)
    onApply(DEFAULT_FILTERS)
  }, [initialFilters, setValues])


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

        </>
      }
      isSearching={isSearching}
    />
  )
}

export default ReportLeadsFilters
