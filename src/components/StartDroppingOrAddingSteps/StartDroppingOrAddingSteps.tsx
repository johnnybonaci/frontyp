import { type FC } from 'react'
import { type StartDroppingOrAddingStepsProps } from 'components/StartDroppingOrAddingSteps/types'
import styles from './startDroppingOrAddingSteps.module.scss'
import { SvgIcon } from '@mui/material'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import c from 'classnames'
import AddStepsActions from 'components/AddStepsActions'

const StartDroppingOrAddingSteps: FC<StartDroppingOrAddingStepsProps> = ({
  isDragActive,
  text,
  handleClick,
  children,
  onAddDescription,
  onAddCaptures,
  startCompanionApp,
  onStartCapturing,
  ...props
}) => {
  return (
    <div className={c(styles.mainContainer, isDragActive && styles.dragging)}>
      <div className={styles.dropzoneContent} {...props}>
        <div className={styles.icon}>
          <SvgIcon fontSize="inherit">
            <AddCircleOutlineRounded fontSize="inherit" />
          </SvgIcon>
        </div>
        <span>{text}</span>
      </div>
      <div className={styles.buttons}>
        <AddStepsActions
          onAddCaptures={onAddCaptures}
          onAddDescription={onAddDescription}
          // startCompanionApp={startCompanionApp}
          onStartCapturing={onStartCapturing}
        />
      </div>
      {children}
    </div>
  )
}

export default StartDroppingOrAddingSteps
