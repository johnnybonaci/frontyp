import type React from 'react'

export interface AutocompletePropsCustom {
  name: string
  resourceName: string
  filterName?: string
  extraFilters?: Record<string, any>
  error?: boolean
  label?: string | React.ReactNode
  helperText?: string | boolean
  onCreate?: (option: string) => void
  extraParameters?: Record<string, any>
  creatable?: boolean
  additionalOptions?: any[]
  filterOption?: (option: any) => boolean
  onBlur?: (e: any) => any
  valueWithEntity?: boolean
  onInputChange?: (event: React.ChangeEvent<any>, newInputValue: string) => void
  [x: string]: any
}
