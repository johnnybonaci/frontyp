import { type ComponentType, type FC } from 'react'
import { type PaginatedTableProps } from 'components/Table/components/withPagination/PaginatedTable.tsx'
import { type TableWithActionsProps } from 'components/Table/components/withActions/TableWithActions.tsx'
import Table, { type TableProps } from 'components/Table'
import { type SortableTableProps } from 'components/Table/components/withSortHeader/SortableTable.tsx'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'

const PaginatedTable = withPagination(Table as ComponentType<any>)
const SortableTable = withSortHeaders(PaginatedTable as ComponentType<any>)

interface ComplianceTableProps
  extends PaginatedTableProps,
    SortableTableProps,
    TableWithActionsProps,
    TableProps {}

const ComplianceTable: FC<ComplianceTableProps> = ({ ...restOfProps }) => {
  return <SortableTable {...restOfProps} />
}

export default ComplianceTable
