import { type ReactNode } from 'react'

export interface TableListItemProps {
  quantityOfItemsToDisplay?: number
  items?: string[]
  emptyState?: ReactNode | string
}
