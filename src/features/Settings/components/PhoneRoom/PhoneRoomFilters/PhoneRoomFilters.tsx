import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, type FC } from 'react'
import { useFormik } from 'formik'
import PhoneRoomFiltersSchema, {
  EMPTY_PHONE_ROOM_FILTERS,
} from 'features/Settings/schema/PhoneRoom/PhoneRoomFiltersSchema'
import FilterWrapper from 'src/components/Filters'
import { type Filters } from 'types/filter'
import Select from 'components/Select'
import useFetchYesNoStatusOptions from 'hooks/useFetchYesNoStatusOptions'

interface PhoneRoomFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: Filters
}

const PhoneRoomFilters: FC<PhoneRoomFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = EMPTY_PHONE_ROOM_FILTERS,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom.filters' })
  const { yesNoStatusOptions } = useFetchYesNoStatusOptions({ includeAllOption: true })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PhoneRoomFiltersSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(EMPTY_PHONE_ROOM_FILTERS)
    onApply(EMPTY_PHONE_ROOM_FILTERS)
  }, [initialFilters, setValues])

  const getFieldProps = useCallback(
    (name: string) => ({
      name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      value: values[name],
      onChange: handleChange,
    }),
    [handleChange, values, initialFilters, setFieldValue]
  )

  useEffect(() => {
    onApply(values)
  }, [JSON.stringify(values)])

  return (
    <FilterWrapper
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <TextField label={t('name')} fullWidth {...getFieldProps('name')} />
          <TextField label={t('service')} fullWidth {...getFieldProps('service')} />
          <Select label={t('active')} options={yesNoStatusOptions} {...getFieldProps('active')} />
        </>
      }
      isSearching={isSearching}
    />
  )
}

export default PhoneRoomFilters
