import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import HistoryLeadsTable from 'features/HistoryLeads/components/HistoryLeadsTable/HistoryLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchHistoryLeadsList from 'features/HistoryLeads/hooks/useFetchHistoryLeadsList.tsx'
import styles from './historyLeadsList.module.scss'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type HistoryLeadsItem } from 'features/HistoryLeads/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import { Drawer, IconButton, Tooltip } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import { VisibilityOutlined } from '@mui/icons-material'

import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/HistoryLeads/transformers'
import RefreshButton from 'components/RefreshButton'

import HistoryLeadsFilters, {
  type HistoryLeadsListFiltersFormValues,
  DEFAULT_FILTERS,
} from '../components/HistoryLeadsFilters/HistoryLeadsFilters.tsx'

const HistoryLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'HistoryLeads' })
  const [selectedHistoryLeads, setSelectedHistoryLeads] = useState<HistoryLeadsItem | undefined>(
    undefined
  )
  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<HistoryLeadsListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )
  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const handleOpenHistoryLeadsDetails = useCallback(
    (HistoryLeadsItem: HistoryLeadsItem) => {
      setSelectedHistoryLeads(HistoryLeadsItem)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedHistoryLeads]
  )
  const { historyLeadsItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchHistoryLeadsList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator


  const initialColumns = useMemo(
    () => [

      {
        header: t('fields.phone'),
        fieldName: 'phone_id',
        sortable: true,
        dataModifier: (item: HistoryLeadsItem) => item.phone,
      }, {
        header: t('fields.trust'),
        fieldName: 'trust',
        sortable: false,
        dataModifier: (item: HistoryLeadsItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenHistoryLeadsDetails(item)
            }}
          >
            <Tooltip title={t('details.title')}>
              <VisibilityOutlined sx={{ fontSize: 14 }} />
            </Tooltip>
          </IconButton>
        ),
      },
    ],
    [t]
  )

  const {
    columns,
    indicators,
    notVisibleColumns,
    notVisibleIndicators,
    reorderColumns,
    visibleIndicators,
    resetToDefaultSettings,
    visibleColumns,
    reorderIndicators,
    toggleColumnVisibility,
    toggleIndicatorVisibility,
  } = useTableSettings(initialColumns, [], 'historyLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <HistoryLeadsFilters
          onCancel={onCancel}
          onApply={onApply}
          isSearching={loading}
          initialFilters={filters}
        />
        <ListSettings
          columns={columns}
          unselectedColumns={notVisibleColumns}
          onReorderColumns={reorderColumns}
          onToggleColumn={toggleColumnVisibility}
          indicators={indicators}
          resetToDefaultSettings={resetToDefaultSettings}
          unselectedIndicators={notVisibleIndicators}
          onReorderIndicators={reorderIndicators}
          onToggleIndicator={toggleIndicatorVisibility}
        />
      </div>
      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <HistoryLeadsTable
        columns={visibleColumns}
        rows={historyLeadsItems}
        loading={loading}
        onSort={setSorter}
        count={lastPage}
        page={page}
        sorter={sorter}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
      />
      <Drawer open={!collapsedViewDetails} onClose={toggleViewDetails} anchor="right">
        <DrawerHeader title={t('details.title')} onClose={toggleViewDetails} />
        <DrawerContent>
          <div className={styles.detailsContainer}>
            <div className={styles.item}>
              <div className={styles.itemLabel}>{t('details.phone')}</div>
              <div className={styles.itemValue}>{selectedHistoryLeads?.phone}</div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default HistoryLeadsList
