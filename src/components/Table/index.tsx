import React, { type CSSProperties, type FC, type ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Scrollbar from 'components/Scrollbar'
import img404 from 'src/assets/errors/error-404.png'
import SkeletonRow from './components/SkeletonRow'
import { generateUniqueId } from 'src/utils/utils.ts'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export interface TableColumn {
  header: string | ReactNode
  fieldName?: string
  sortName?: string
  sortable?: boolean
  dataModifier?: (data: any) => ReactNode | string | null
  cellStyles?: CSSProperties
  fillEmptyValue?: string | number | ReactNode
}

export type TableRowData = object | null | undefined

export interface TableProps {
  columns: TableColumn[]
  rows?: TableRowData[] | null
  loading?: boolean
  minWidth?: number
  CollapsableElement?: FC<{ item: any }>
  collapsible?: boolean
  skeletonRowsQuantity?: number
}

const Table: FC<TableProps> = ({
  columns = [],
  rows,
  minWidth = 800,
  loading = true,
  collapsible = false,
  CollapsableElement,
  skeletonRowsQuantity = 10,
}: TableProps) => {
  const { t } = useTranslation()
  const [openRows, setOpenRows] = useState<Record<number, boolean>>({})

  const toggleRow = (rowIndex: number): void => {
    setOpenRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }))
  }

  useEffect(() => {
    if (loading) {
      setOpenRows({})
    }
  }, [loading])

  if (!loading && rows?.length === 0) {
    return (
      <Stack m={8} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
        <img
          alt="no results"
          src={img404}
          style={{
            width: 120,
          }}
        />
        <Typography color="text.secondary">{t('noResults')}</Typography>
      </Stack>
    )
  }

  return (
    <Scrollbar>
      <Box sx={{ minWidth }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {collapsible && <TableCell />}
              {columns.map(({ header, cellStyles }) => (
                <TableCell key={generateUniqueId()} sx={cellStyles}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || rows === null
              ? Array.from({ length: skeletonRowsQuantity }, (_, i) => (
                  <SkeletonRow key={i} columnsQuantity={columns.length + (collapsible ? 1 : 0)} />
                ))
              : rows?.map((row, rowIndex) => (
                  <React.Fragment key={generateUniqueId()}>
                    <TableRow sx={{ cursor: collapsible ? 'pointer' : 'default' }}>
                      {collapsible && (
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleRow(rowIndex)
                            }}
                          >
                            {openRows[rowIndex] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </TableCell>
                      )}
                      {columns.map(
                        (
                          { dataModifier, fieldName, cellStyles, fillEmptyValue = '-' },
                          colIndex
                        ) => {
                          const value = dataModifier
                            ? dataModifier(row)
                            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-expect-error
                              row?.[fieldName] ?? fillEmptyValue
                          return (
                            <TableCell
                              key={`${rowIndex}_${colIndex}_${generateUniqueId()}`}
                              sx={cellStyles}
                            >
                              {value}
                            </TableCell>
                          )
                        }
                      )}
                    </TableRow>
                    {collapsible && openRows[rowIndex] && (
                      <>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                        /* @ts-expect-error */}
                        {CollapsableElement && <CollapsableElement columns={columns} item={row} />}
                      </>
                    )}
                  </React.Fragment>
                ))}
          </TableBody>
        </MuiTable>
      </Box>
    </Scrollbar>
  )
}

export default Table
