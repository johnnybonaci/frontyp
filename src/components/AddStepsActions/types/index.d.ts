import { type ReactNode } from 'react'

export interface AddStepsActionsProps {
  onAddCaptures: (files: File[] = []) => void
  onAddDescription: () => void
  startCompanionApp?: () => void
  children?: ReactNode
  onStartCapturing: () => void
}
