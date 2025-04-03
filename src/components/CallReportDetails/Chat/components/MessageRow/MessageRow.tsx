import { type ReactElement } from 'react'
import c from 'classnames'
import Avatar from '../Avatar'
import styles from './messageRow.module.scss'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { type AvatarProps } from 'components/CallReportDetails/Chat/components/Avatar/types'

export interface MessageRowProps {
  children: ReactElement
  isSender?: boolean
  avatar?: AvatarProps
  isLoading?: boolean
}

const MessageRow = ({
  children,
  isSender,
  avatar,
  isLoading = false,
}: MessageRowProps): ReactElement => {
  return (
    <div className={c(styles.messageContainer, isSender && styles.senderContainer)}>
      <div className={c(styles.messageChat, isSender && styles.senderChat)}>
        {isLoading ? <ScaleLoader color="var(--white-base)" height={14} /> : children}
      </div>
      {avatar && (
        <Avatar
          containerSize={avatar?.containerSize}
          imageSize={avatar?.imageSize}
          imageSrc={avatar?.imageSrc}
          name={avatar?.name}
        />
      )}
    </div>
  )
}

export default MessageRow
