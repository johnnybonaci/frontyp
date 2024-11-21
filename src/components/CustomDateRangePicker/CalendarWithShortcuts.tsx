import { Box, Chip, Stack } from '@mui/material'
import { DateOption, DateRange } from './types'
import moment from 'moment'

interface CalendarWithShortCutsProps {
  children: React.ReactNode
  onChange: (e: any) => void
  value: DateRange
  options: DateOption[]
}

function isSameDateRange(dr1: DateRange, dr2: DateRange) {
  return moment(dr1[0]).isSame(moment(dr2[0]), 'D') && moment(dr1[1]).isSame(moment(dr2[1]), 'D')
}

export default function CalendarWithShortcuts({
  children,
  onChange,
  value,
  options,
}: CalendarWithShortCutsProps): React.ReactNode {
  return (
    <Stack
      direction="row"
      bgcolor="background.paper"
      borderRadius={1}
      boxShadow="2px 2px 8px lightgrey"
    >
      <Stack mt={4} p={2} gap={1}>
        {options.map((dateOption: DateOption) => {
          const { key, text, value: opValue } = dateOption
          const isActive = isSameDateRange(value, opValue)

          return (
            <Chip
              key={key}
              label={text}
              onClick={(_: any) => onChange(opValue)}
              variant={isActive ? 'filled' : 'outlined'}
              size="small"
              sx={{
                '& .MuiChip-label': {
                  padding: '12px',
                },
              }}
            />
          )
        })}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  )
}
