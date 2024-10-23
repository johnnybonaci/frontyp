import React from 'react'
import DateRangePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField, FormControl, FormHelperText, FormLabel } from '@mui/material'
import './dateRangePicker.module.scss'

interface DateRangePickerProps {
  label: string
  value: [Date | undefined, Date | undefined]
  onChange: (dates: any[]) => void
  error?: string
}

const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel sx={{ left: '-30px !important' }}>{label}</FormLabel>
      <DateRangePicker
        startDate={value[0]}
        endDate={value[1]}
        selectsRange
        onChange={onChange}
        customInput={<TextField />}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default CustomDateRangePicker
