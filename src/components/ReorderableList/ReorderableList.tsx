import React from 'react'
import styles from './reorderableList.module.scss'
import ReorderableItem from 'components/ReorderableItem'

type Item = any

interface ReorderableListProps {
  items: Item[]
  unselectedItems: Item[]
  toggleVisibility: (item: Item) => void
  reorderItems: (startIndex: number, endIndex: number) => void
}

const ReorderableList: React.FC<ReorderableListProps> = ({
  items,
  toggleVisibility,
  unselectedItems,
  reorderItems,
}) => {
  return (
    <div className={styles.reorderableList}>
      <div className={styles.selectedList}>
        {items.map((item, index) => (
          <ReorderableItem
            key={item.id ?? item.name ?? item.fieldName}
            item={item}
            index={index}
            totalItems={items.length}
            handleChangeSelect={() => {
              toggleVisibility(item)
            }}
            isSelected={!unselectedItems.includes(item)}
            reorderItems={reorderItems}
          />
        ))}
      </div>
    </div>
  )
}

export default ReorderableList
