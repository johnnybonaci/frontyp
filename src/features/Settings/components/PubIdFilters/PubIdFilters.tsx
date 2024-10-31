import React from 'react'
import { TextField, Box, Typography, styled } from '@mui/material'

// Styled components using MUI's styled API
const FilterContainer = styled(Box)({
  display: 'flex',
  gap: '32px',
  alignItems: 'center',
})

const FilterGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const FilterLabel = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#666666',
})

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    width: '128px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
})

interface PubIdFiltersProps {
  filters: any
  onCancel: () => void
  onApply: (data: any) => void
}

function PubIdFilters({ filters, onCancel, onApply }: PubIdFiltersProps): React.ReactNode {
  console.log(filters, onCancel, onApply)
  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>PUBS</FilterLabel>
        <StyledTextField variant="outlined" size="small" />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>NAME</FilterLabel>
        <StyledTextField variant="outlined" size="small" />
      </FilterGroup>
    </FilterContainer>
  )
}

export default PubIdFilters
