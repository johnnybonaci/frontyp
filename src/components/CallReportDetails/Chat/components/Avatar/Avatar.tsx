import { type ReactElement } from 'react'
import { Avatar as MuiAvatar } from '@mui/material'
import { type AvatarProps } from 'components/CallReportDetails/Chat/components/Avatar/types'

const Avatar = ({
  containerSize,
  imageSize,
  imageSrc,
  name = 'Avatar',
}: AvatarProps): ReactElement => {
  return (
    <MuiAvatar
      sx={{
        cursor: 'pointer',
        height: containerSize,
        width: containerSize,
        bgcolor: 'var(--avatar-bg)',
      }}
    >
      <img
        style={{
          cursor: 'pointer',
          height: imageSize,
          width: imageSize,
        }}
        src={imageSrc}
        alt={name}
      />
    </MuiAvatar>
  )
}

export default Avatar
