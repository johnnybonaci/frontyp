import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { EditOutlined } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type PhoneRoomItem } from 'features/Settings/types/PhoneRoom'
import { VisibilityOutlined } from '@mui/icons-material'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface PhoneRoomTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickEdit: (phoneRoomItem: PhoneRoomItem) => void
  onClickViewConfig: (phoneRoomItem: PhoneRoomItem) => void
}

const PhoneRoomTable: FC<PhoneRoomTableProps> = ({
  onClickEdit,
  onClickViewConfig,
  ...restOfProps
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom.actions' })

  const actions = [
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      orValidation: true,
    },
    {
      label: t('viewConfig'),
      icon: VisibilityOutlined,
      onClick: onClickViewConfig,
      orValidation: true,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} onRight />
}

export default PhoneRoomTable
