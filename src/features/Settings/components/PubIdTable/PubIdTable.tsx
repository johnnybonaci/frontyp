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
import { type PubIdItem } from 'features/Settings/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface PubIdTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickEdit: (pubIdItem: PubIdItem) => void
}

const PubIdTable: FC<PubIdTableProps> = ({ onClickEdit, ...restOfProps }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId.actions' })

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

export default PubIdTable
