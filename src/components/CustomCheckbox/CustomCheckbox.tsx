import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'

interface CustomCheckboxProps {
  value: boolean
  onChange: (isChecked: boolean) => void
  label: string
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value, onChange, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(_: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) =>
            onChange(isChecked)
          }
        />
      }
      sx={{ gap: 1 }}
      label={label}
    />
  )
}

export default CustomCheckbox
