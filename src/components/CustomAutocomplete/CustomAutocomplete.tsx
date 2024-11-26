import React, { useState } from 'react'
import { Autocomplete, TextField, Chip, debounce } from '@mui/material'
import useGetOptions from 'hooks/useGetOptions.ts'

export interface Option {
  title: string
  id?: string
}

interface MultipleAutocompleteProps {
  value: Option[]
  onChange: (event: any, newValue: Array<string | Option>) => void
  label: string
  creatable?: boolean
  resourceName?: string
  filterName?: string
  multiple?: boolean
  placeholder?: string
  options?: Option[]
}

const CustomAutocomplete: React.FC<MultipleAutocompleteProps> = ({
  value,
  onChange,
  multiple = true,
  creatable = true,
  label,
  placeholder = '',
  options,
  resourceName,
  filterName = 'search',
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
      multiple={multiple}
      freeSolo={creatable}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      options={allOptions?.filter(
        (option) =>
          !value.some((selectedOption) =>
            typeof option === 'string'
              ? option === selectedOption.title
              : option.title === selectedOption.title
          )
      )}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      value={value}
      onChange={handleChange}
      onInputChange={debounce((_event, newInputValue) => {
        setInputValue(newInputValue)
      }, 500)}
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
