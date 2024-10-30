import { type ComponentType, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VisibilityOutlined } from '@mui/icons-material'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import { type CPAReportItem } from 'features/CPAReport/types'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)
const TableWithActions = withActions(SortableTable as ComponentType<any>)

interface CallReportTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {
  onClickView: (cpaReportItem: CPAReportItem) => void
}

const CPAReportTable: FC<CallReportTableProps> = ({ onClickView, ...restOfProps }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CPAReport.actions' })

  const actions = [
    {
      label: t('view'),
      icon: VisibilityOutlined,
      onClick: onClickView,
      orValidation: true,
      visible: (cpaReportItem: CPAReportItem) => cpaReportItem.children,
    },
  ]

  return <TableWithActions {...restOfProps} actions={actions} />
}

export default CPAReportTable
