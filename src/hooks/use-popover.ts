import { type MutableRefObject, useCallback, useRef, useState } from 'react'

export interface PopoverState {
  anchorRef: MutableRefObject<HTMLDivElement | null>
  handleClose: () => void
  handleOpen: () => void
  handleToggle: () => void
  open: boolean
}

export function usePopover(): PopoverState {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState)
  }, [])

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open,
  }
}
