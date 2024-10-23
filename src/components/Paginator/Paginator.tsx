import { type FC } from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from '@mui/icons-material'
import styles from './paginator.module.scss'

interface PaginatorTextBlockProps {
  count: number
  page: number
  setPage: (value: number) => void
  displayResultsMessage: string
}

const Paginator: FC<PaginatorTextBlockProps> = ({
  setPage,
  page,
  count,
  displayResultsMessage,
}) => {
  if (!(count > 1)) {
    return null
  }
  return (
    <div className={styles.paginator}>
      <div className={styles.showingResults}>{displayResultsMessage}</div>
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
          setPage(value)
        }}
      />
    </div>
  )
}

export default Paginator
