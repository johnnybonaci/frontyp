import {
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  Radio,
  RadioGroup,
  SxProps,
} from '@mui/material'
import { ChangeEvent, ComponentType, ReactNode, useCallback } from 'react'

interface OptionWithProps {
  text: ReactNode
  value: any
  optionProps?: Record<string, any>
}

export type onChangeType = (event: ChangeEvent<HTMLInputElement>, value: string | string[]) => void
interface RadioButtonProps {
  value: any | any[]
  options: OptionWithProps[]
  name?: string
  onChange: onChangeType
  row?: boolean
  ControlComponent?: ComponentType
  FormControlLabelProps?: Partial<FormControlLabelProps>
  sx?: SxProps
}
export default function RadioButton({
  value,
  options,
  onChange,
  name,
  ControlComponent = Radio,
  row = false,
  FormControlLabelProps = {},
  sx = {},
}: RadioButtonProps): ReactNode {
  const isRadio = ControlComponent === Radio
  const GroupComponent = isRadio ? RadioGroup : FormGroup
  const customProps = useCallback(
    (opValue: string) => {
      if (isRadio) return {}
      return {
        checked: value.includes(opValue),
      }
    },
    [value]
  )

  const handleChange = useCallback(
    (...params: any[]) => {
      if (isRadio) onChange(params[0], params[0].target.value)
      else {
        const checked = params[0].target.checked as boolean
        const newValue = params[0].target.value as string

        if (checked) {
          onChange(params[0], [...value, newValue])
        } else {
          onChange(
            params[0],
            value.filter((val: string) => val !== newValue)
          )
        }
      }
    },
    [value, isRadio]
  )

  return (
    <GroupComponent name={name} row={row} sx={sx} value={value} onChange={handleChange}>
      {options.map(({ text, value: opValue, optionProps }, index) => (
        <FormControlLabel
          key={`${name}_option-${index}`}
          value={opValue}
          control={<ControlComponent {...optionProps} />}
          label={text}
          {...customProps(opValue)}
          {...FormControlLabelProps}
        />
      ))}
    </GroupComponent>
  )
}
