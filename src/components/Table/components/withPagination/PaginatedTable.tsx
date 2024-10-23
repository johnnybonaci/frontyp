import Table, { type TableRowData } from 'components/Table'
import {
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  type TablePaginationProps,
} from '@mui/material'
import { type ElementType, type FC, useState } from 'react'
import styles from './paginatedTable.module.scss'
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from '@mui/icons-material'

export interface PaginatedTableProps {
  count: number
  page: number
  onPageChange: (value: number) => void
  perPage: number
  displayResultsMessage: string
  onRowsPerPageChange: (value: number) => void
  rowsPerPageOptions?: number[]
  rows?: TableRowData[] | null
  paginationProps?: TablePaginationProps
  as?: ElementType
}

const PaginatedTable: FC<PaginatedTableProps> = ({
  page,
  onPageChange,
  perPage,
  onRowsPerPageChange,
  displayResultsMessage,
  rowsPerPageOptions = [5, 10, 15],
  count,
  as: Component = Table,
  rows = [],
  ...tableProps
}) => {
  const [perPageValue, setPerPageValue] = useState(perPage)

  return (
    <>
      <Component rows={rows} {...tableProps} />
      {rows && rows.length > 0 && count > 1 && (
        <div className={styles.paginator}>
          <div className={styles.showingResults}>
            {displayResultsMessage}
            <Select
              value={perPageValue}
              onChange={(e) => {
                setPerPageValue(e.target.value as number)
                onRowsPerPageChange(e.target.value as number)
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Pagination
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            count={count}
            page={page}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: ChevronLeftRounded,
                  next: ChevronRightRounded,
                  first: KeyboardDoubleArrowLeftRounded,
                  last: KeyboardDoubleArrowRightRounded,
                }}
                {...item}
              />
            )}
            onChange={(_e, value) => {
              onPageChange(value)
            }}
          />
        </div>
      )}
    </>
  )
}

export default PaginatedTable
