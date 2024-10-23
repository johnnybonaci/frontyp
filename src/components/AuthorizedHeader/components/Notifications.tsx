import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material'
import { type FC } from 'react'
import { NotificationsNoneOutlined } from '@mui/icons-material'

const Notifications: FC = () => {
  return (
    <Tooltip title="Notifications">
      <IconButton>
        <Badge badgeContent={4} color="success" variant="dot">
          <SvgIcon fontSize="small">
            <NotificationsNoneOutlined />
          </SvgIcon>
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default Notifications
