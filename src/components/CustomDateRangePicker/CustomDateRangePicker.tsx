import React, { useState } from 'react'
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
  const [startDate, setStartDate] = useState(value[0])
  const [endDate, setEndDate] = useState(value[1])

  const handleChange = (e: any) => {
    setStartDate(e[0])
    setEndDate(e[1])
  }

  const handleCalendarClose = () => {
    onChange([startDate, endDate])
  }

  return (
    <FormControl error={Boolean(error)}>
      <FormLabel sx={{ left: '-30px !important' }}>{label}</FormLabel>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={handleChange}
        onCalendarClose={handleCalendarClose}
        customInput={<TextField />}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default CustomDateRangePicker
