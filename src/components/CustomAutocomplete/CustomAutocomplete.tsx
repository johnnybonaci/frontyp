import React, { useState } from 'react'
import { Autocomplete, TextField, Chip, SxProps } from '@mui/material'
import useGetOptions from 'hooks/useGetOptions.ts'

export interface Option {
  title: string
  id?: string
}

interface MultipleAutocompleteProps {
  name?: string
  value: Option[] | Option
  onChange: (event: any, newValue: Array<string | Option>) => void
  onBlur?: (e: any) => void
  error?: boolean
  label: string
  creatable?: boolean
  multiple?: boolean
  placeholder?: string
  helperText?: string
  options?: Option[]
  resourceName?: string
  filterName?: string
  remote?: boolean
  sx?: SxProps
}

const CustomAutocomplete: React.FC<MultipleAutocompleteProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error = false,
  multiple = true,
  creatable = true,
  label,
  placeholder = '',
  options = [],
  resourceName,
  filterName = 'search',
  remote = false,
  helperText,
  sx = {},
}) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  let finalOptions: Option[] = options

  if (remote && resourceName) {
    const data = useGetOptions([resourceName], {
      [filterName]: inputValue || undefined,
    })
    finalOptions = data[`${resourceName}Options`] || []
  }

  const handleChange = (event: any, newValue: Array<string | Option> | any): void => {
    let newOptions = newValue
    if (creatable) {
      newOptions = newValue.map((value: string | Option) =>
        typeof value === 'string' ? { title: value } : value
      )
    }

    onChange(event, newOptions)
  }

  const filterOptions = (opts: Option[], state: any): Option[] => {
    const search = state.inputValue.toLowerCase()
    return opts.filter((opt) => opt.title.toLowerCase().includes(search))
  }

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={creatable}
      filterOptions={!remote ? filterOptions : undefined}
      options={finalOptions}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      value={value}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue, reason) => {
        setInputValue(newInputValue)
        if (reason === 'input') setOpen(true)
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      onChange={handleChange}
      renderTags={(value: Option[], getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} key={option.id} />
        ))
      }
      sx={{ ...sx, root: { height: 'unset !important' } }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          onBlur={onBlur}
          label={label}
          error={error}
          placeholder={placeholder}
          helperText={helperText}
        />
      )}
    />
  )
}

export default CustomAutocomplete
