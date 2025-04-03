import React from 'react'
import { TextField, IconButton, SvgIcon } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import styles from './numberInput.module.scss'

interface NumberInputProps {
  name: string
  max?: number
  value: number
  onChange: (newValue: number) => void
  [x: string]: any
}

const NumberInput: React.FC<NumberInputProps> = ({ name, max, value, onChange, ...restProps }) => {
  const handleIncrease = (): void => {
    if (!max || value < max) {
      onChange(value + 1)
    }
  }

  const handleDecrease = (): void => {
    if (value > 0) {
      onChange(value - 1)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(parseInt(event.target.value, 10))
  }

  return (
    <div className={styles.wrapper}>
      <IconButton onClick={handleDecrease} disabled={value === 0}>
        <SvgIcon fontSize="inherit">
          <Remove />
        </SvgIcon>
      </IconButton>
      <TextField
        value={value}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        size="small"
        style={{ width: 80 }}
        {...restProps}
        inputProps={{ style: { textAlign: 'center' } }}
      />
      <IconButton onClick={handleIncrease} disabled={value === max}>
        <SvgIcon fontSize="inherit">
          <Add />
        </SvgIcon>
      </IconButton>
    </div>
  )
}

export default NumberInput
