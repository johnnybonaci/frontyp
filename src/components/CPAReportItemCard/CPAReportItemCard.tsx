import React from 'react'
import { type CPAReportItem } from 'features/CPAReport/types'
import { SvgIcon, TableCell, TableRow } from '@mui/material'
import { type TableColumn } from 'components/Table'
import { generateUniqueId } from 'utils/utils.ts'
import { SubdirectoryArrowRight } from '@mui/icons-material'
import styles from './cpaReportItemCard.module.scss'

interface CPAReportItemCardProps {
  item: CPAReportItem
  columns: TableColumn[]
}

const CPAReportItemCard: React.FC<CPAReportItemCardProps> = ({ columns, item }) => {
  return item.children?.map((child) => (
    <TableRow key={`${child.buyerName}_child_${generateUniqueId()}`} sx={{ background: '#f8f8f8' }}>
      <TableCell>
        <div className={styles.childrenIcon}>
          <SvgIcon fontSize="inherit">
            <SubdirectoryArrowRight />
          </SvgIcon>
        </div>
      </TableCell>
      {columns.map(({ dataModifier, fieldName, cellStyles, fillEmptyValue = '-' }, colIndex) => {
        const value = dataModifier
          ? dataModifier(child)
          : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            child?.[fieldName] ?? fillEmptyValue

        return (
          <TableCell
            key={`${child.buyerName}_child_${colIndex}_${generateUniqueId()}`}
            sx={{ ...cellStyles }}
          >
            {value}
          </TableCell>
        )
      })}
    </TableRow>
  ))
}

export default CPAReportItemCard
