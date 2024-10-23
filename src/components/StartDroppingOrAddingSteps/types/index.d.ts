import { type ReactNode } from 'react'

export interface StartDroppingOrAddingStepsProps {
  text?: string
  isDragActive?: boolean
  handleClick?: any
  onAddCaptures: (files: File[] = []) => void
  onAddDescription: () => void
  startCompanionApp?: () => void
  children?: ReactNode
  onStartCapturing: () => void
}
