import React, { type FC } from 'react'
import AccountPopover from './AccountPopover'
import { Avatar } from '@mui/material'
import { usePopover, type PopoverState } from 'hooks/use-popover.ts'

const Account: FC = () => {
  const accountPopover: PopoverState = usePopover()

  return (
    <>
      <Avatar
        onClick={accountPopover.handleOpen}
        ref={accountPopover.anchorRef as React.RefObject<HTMLDivElement>}
        sx={{
          cursor: 'pointer',
          height: 40,
          width: 40,
        }}
        src="/assets/avatars/avatar-anika-visser.png"
      />
      <AccountPopover
        anchorEl={accountPopover.anchorRef?.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  )
}

export default Account
