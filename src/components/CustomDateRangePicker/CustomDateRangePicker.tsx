import React, { useState } from 'react'
import DateRangePicker from 'react-datepicker'
import { TextField, FormControl, FormHelperText, FormLabel } from '@mui/material'
import CalendarWithShortcuts from './CalendarWithShortcuts'

import { DateRange } from './types'
import { DATE_OPTIONS } from './constants'

import 'react-datepicker/dist/react-datepicker.css'
import './dateRangePicker.module.scss'

interface DateRangePickerProps {
  label: string
  value: DateRange
  onChange: (dates: any[]) => void
  error?: string
  withShortcuts?: boolean
}

const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  value,
  onChange,
  error,
  withShortcuts = false,
}) => {
  const [startDate, setStartDate] = useState(value[0])
  const [endDate, setEndDate] = useState(value[1])

  const changeSelectedValues = (e: any) => {
    setStartDate(e[0])
    setEndDate(e[1])
  }

  const updateValues = () => {
    onChange([startDate, endDate])
  }

  const onClickShorcuts = (shorcutRange: DateRange) => {
    changeSelectedValues(shorcutRange)
    updateValues()
  }

  return (
    <FormControl error={Boolean(error)}>
      <FormLabel sx={{ left: '-30px !important' }}>{label}</FormLabel>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={changeSelectedValues}
        onCalendarClose={updateValues}
        customInput={<TextField />}
        popperPlacement="top-end"
        calendarContainer={({ children }) =>
          withShortcuts ? (
            <CalendarWithShortcuts
              onChange={onClickShorcuts}
              value={[startDate, endDate]}
              options={DATE_OPTIONS}
            >
              {children}
            </CalendarWithShortcuts>
          ) : (
            children
          )
        }
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default CustomDateRangePicker
