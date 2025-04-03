import { type FC, useMemo } from 'react'
import c from 'classnames'
import styles from './reorderableItem.module.scss'
import { ArrowUpward, ArrowDownward, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { type ColumnSettings, type IndicatorSettings } from 'hooks/useTableSettings.tsx'

interface ReorderableItemProps {
  item: ColumnSettings | IndicatorSettings
  index: number
  totalItems: number
  isSelected?: boolean
  handleChangeSelect: () => void
  reorderItems: (startIndex: number, endIndex: number) => void
}

const ReorderableItem: FC<ReorderableItemProps> = ({
  item,
  index,
  totalItems,
  isSelected,
  handleChangeSelect,
  reorderItems,
}) => {
  const isFirstItem = useMemo(() => index === 0, [index])
  const isLastItem = useMemo(() => index === totalItems - 1, [index, totalItems])

  return (
    <div className={c(styles.itemContainer, isSelected && styles.isSelected)}>
      <div className={styles.actionsContainer}>
        <span className={styles.eyeIcon} onClick={handleChangeSelect} role="button" tabIndex={0}>
          {isSelected ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </span>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <div className={styles.title}>{item?.name ?? item?.header}</div>
      <div className={styles.reorderButtons}>
        {!isFirstItem && (
          <ArrowUpward
            className={c(styles.arrowIcon, { [styles.disabled]: isFirstItem })}
            onClick={() => {
              reorderItems(index, index - 1)
            }}
            role="button"
            tabIndex={0}
          />
        )}
        {!isLastItem && (
          <ArrowDownward
            className={c(styles.arrowIcon, { [styles.disabled]: isLastItem })}
            onClick={() => {
              reorderItems(index, index + 1)
            }}
            role="button"
            tabIndex={0}
          />
        )}
      </div>
    </div>
  )
}

export default ReorderableItem
