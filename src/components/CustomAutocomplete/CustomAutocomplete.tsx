import React, { useState } from 'react'
import { Autocomplete, TextField, Chip, debounce, SxProps, createFilterOptions } from '@mui/material'
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
  resourceName?: string
  filterName?: string
  multiple?: boolean
  placeholder?: string
  helperText?: string
  options?: Option[]
  sx?: SxProps
}

const filterOptions = createFilterOptions<Option>({
  matchFrom: 'any',
  stringify: (option) => option.title.toLowerCase(),
})

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
  options,
  resourceName,
  filterName = 'search',
  helperText,
  sx = {},
}) => {
  const [inputValue, setInputValue] = useState('')
  const resourceOptions = useGetOptions([resourceName ?? ''], {
    [filterName]: inputValue || undefined,
  })[`${resourceName}Options`]

  const allOptions = resourceName ? resourceOptions : options

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
      key={inputValue}
      multiple={multiple}
      freeSolo={creatable}
      filterOptions={filterOptions}
      options={allOptions || []}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      value={value}
      onChange={handleChange}
      onInputChange={debounce((_event, newInputValue) => {
        setInputValue(newInputValue)
      }, 500)}
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
