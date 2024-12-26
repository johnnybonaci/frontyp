import { type ComponentType, type FC } from 'react'
import { EditOutlined } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import withActions from 'components/Table/components/withActions'
import { type UserItem } from 'features/Users/types'
import { useTranslation } from 'react-i18next'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface UserTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickEdit: (userItem: UserItem) => void
}

const UserTable: FC<UserTableProps> = ({ onClickEdit, ...restOfProps }) => {
  const { t } = useTranslation('features', { keyPrefix: 'User.actions' })

  const actions = [
    {
      label: t('edit'),
      icon: EditOutlined,
      onClick: onClickEdit,
      orValidation: true,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} onRight />
}

export default UserTable
