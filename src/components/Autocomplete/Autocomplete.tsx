import { debounce, Autocomplete as MUIAutocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'
import useGetOptions, { LIST_ENTITIES_PERMISSIONS, ResourceName } from 'hooks/useGetOptions'
import { type ReactNode, useEffect, useState } from 'react'
import { type AutocompletePropsCustom } from './types'
import { generateUniqueId } from 'utils/utils'
import styles from './autocomplete.module.scss'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import Gated from 'components/Gated'

const CREATABLE_ID = generateUniqueId()

const isValidResourceName = (name: string): name is ResourceName => {
  return Object.keys(LIST_ENTITIES_PERMISSIONS).includes(name)
}

function Autocomplete({
  name,
  resourceName,
  filterName = 'name',
  extraFilters = {},
  filterOption = () => true,
  error = false,
  helperText = '',
  creatable = false,
  onCreate = undefined,
  onBlur = () => { },
  freeSolo = false,
  extraParameters = {},
  valueWithEntity = false,
  additionalOptions = [],
  variant = 'outlined',
  onChange,
  ...restProps
}: AutocompletePropsCustom): ReactNode {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<string>('')

  const allOptions: any[] = isValidResourceName(resourceName)
    ? useGetOptions(
      resourceName,
      {
        [filterName]: inputValue,
        ...extraFilters,
        perPage: 50,
      },
      valueWithEntity,
      extraParameters
    )
    : []

  const options =
    creatable &&
      inputValue &&
      allOptions.filter((option) => option?.name === inputValue).length === 0
      ? allOptions.concat([{ id: CREATABLE_ID, name: inputValue }])
      : allOptions ?? []

  const handleChange = (e: any, value: any): void => {
    if (creatable && onCreate && value?.id === CREATABLE_ID) {
      onCreate(inputValue)
    } else {
      if (restProps.multiple) {
        onChange(e, Array.isArray(restProps.value) ? [...restProps.value, value] : [value])
      } else {
        onChange(e, value)
      }
    }
  }

  const handleAddNewOption = (value: string): void => {
    const newOption = { id: generateUniqueId(), [filterName]: value }
    onChange?.(null, [...options, newOption])
  }

  useEffect(() => {
    setInputValue('')
  }, [restProps?.value])

  return (
    <Gated permissions={LIST_ENTITIES_PERMISSIONS[resourceName as ResourceName]}>
      <MUIAutocomplete
        options={additionalOptions
          .concat(options)
          .map((option) => ({ ...option, key: option.id }))
          .filter((option) => filterOption(option))}
        getOptionLabel={(option) => {
          return option.name || option[filterName]
        }}
        renderOption={(props, option) => {
          return (
            <span
              {...props}
              className={c(
                props.className,
                styles.option,
                option.id === CREATABLE_ID && styles.creatableOption
              )}
            >
              {`
                ${option.id === CREATABLE_ID
                  ? `${t('createOption', { option: option.name || option[filterName] })}`
                  : option.name || option[filterName]}`}
            </span>
          )
        }}
        getOptionKey={(option) => option.value}
        renderInput={(params) => (
          <TextField
            {...params}
            id={generateUniqueId()}
            name={name}
            label={restProps.label}
            helperText={helperText}
            error={error}
            onBlur={onBlur}
            variant={variant}
            className={styles.inputForm}
          />
        )}
        onInputChange={debounce((_event, newInputValue) => {
          setInputValue(newInputValue)
        }, 500)}
        disablePortal
        autoComplete
        isOptionEqualToValue={(option, value) => {
          return value && (option?.value === value?.value || option?.value === value?.id)
        }}
        multiple={restProps.multiple}
        freeSolo={freeSolo}
        onChange={handleChange}
        selectOnFocus={!freeSolo}
        clearOnBlur={!freeSolo}
        onBlur={(e) => {
          if (freeSolo && inputValue.trim() !== '') {
            handleAddNewOption(inputValue.trim())
            setInputValue('')
          }
          onBlur(e)
        }}
        {...restProps}
      />
    </Gated>
  )
}

export default Autocomplete