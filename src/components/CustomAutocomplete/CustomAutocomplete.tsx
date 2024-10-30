import React from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'

export interface Option {
  title: string
  id?: string
}

interface MultipleAutocompleteProps {
  value: Option[]
  onChange: (event: any, newValue: Array<string | Option>) => void
  label: string
  creatable?: boolean
  multiple?: boolean
  placeholder?: string
  options: Option[]
}

const CustomAutocomplete: React.FC<MultipleAutocompleteProps> = ({
  value,
  onChange,
  multiple = true,
  creatable = true,
  label,
  placeholder = '',
  options,
}) => {
  const handleChange = (event: any, newValue: Array<string | Option> | any): void => {
    let newOptions = newValue
    if (creatable) {
      newOptions = newValue.map((value: string | Option) =>
        typeof value === 'string' ? { title: value } : value
      )
    }

    onChange(event, newOptions)
  }

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={creatable}
      options={options}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      value={value}
      onChange={handleChange}
      renderTags={(value: Option[], getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} key={option.title} />
        ))
      }
      sx={{ root: { height: 'unset !important' } }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  )
}

export default CustomAutocomplete
