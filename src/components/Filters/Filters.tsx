import { type FC, useCallback, useState } from 'react'
import { SvgIcon, IconButton, Drawer, Typography, Tooltip, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import { type FilterProps } from 'components/Filters/types'
import { Close, Tune } from '@mui/icons-material'
import styles from './filters.module.scss'
import DrawerContent from 'components/DrawerContent'

const Filters: FC<FilterProps> = ({
  onApply,
  onClear,
  topFilters,
  bottomFilters,
  isSearching = false,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const { t } = useTranslation('common', { keyPrefix: 'filters' })

  const toggleFilters = useCallback(() => {
    setCollapsed(!collapsed)
  }, [setCollapsed, collapsed])

  const handleApply = useCallback(
    (e: any) => {
      onApply(e)
      setCollapsed(true)
    },
    [setCollapsed, collapsed]
  )

  const handleClear = useCallback(() => {
    onClear()
    setCollapsed(true)
  }, [setCollapsed, collapsed])

  return (
    <form noValidate onSubmit={handleApply} className={styles.wrapper}>
      <Drawer open={!collapsed} onClose={toggleFilters} anchor="right" variant="persistent">
        <div className={styles.filters}>
          <div className={styles.titleContainer}>
            <Typography variant="h1" className={styles.title}>
              {t('title')}
            </Typography>
            <Button
              fullWidth
              onClick={handleClear}
              size="small"
              className={styles.clear}
              variant="outlined"
            >
              {t('clear')}
            </Button>
            <LoadingButton
              fullWidth
              type="submit"
              size="small"
              loading={isSearching}
              className={styles.submit}
            >
              {t('apply')}
            </LoadingButton>
            <IconButton onClick={toggleFilters}>
              <SvgIcon fontSize="inherit">
                <Close />
              </SvgIcon>
            </IconButton>
          </div>
          <DrawerContent>
            {!collapsed && (
              <div className={styles.filtersContainer}>
                {topFilters}
                {bottomFilters}
              </div>
            )}
          </DrawerContent>
        </div>
      </Drawer>
      <div className={styles.actions}>
        <IconButton color="info" aria-label="hide" size="small" onClick={toggleFilters}>
          <Tooltip title={t('title')}>
            <Tune />
          </Tooltip>
        </IconButton>
      </div>
    </form>
  )
}

export default Filters
