import { type FC, type ReactElement, type MouseEvent, useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { Alert } from '@mui/material'

interface PopoverTextProps {
  childrenPopover: string | ReactElement
  msgPopover: string
  typePopover: 'warningPopover' | 'alertPopover' | 'standard'
}

const PopoverText: FC<PopoverTextProps> = ({
  childrenPopover,
  msgPopover,
  typePopover = 'warningPopover',
}): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {childrenPopover}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Alert
          variant={typePopover as 'standard' | 'filled' | 'outlined' | 'warningPopover'}
          sx={{ p: 1 }}
        >
          {msgPopover}
        </Alert>
      </Popover>
    </div>
  )
}

export default PopoverText
