import { useMemo, type FC } from 'react'
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


  const { onCancel, onApply, filters, filtersToAPI } = useFilters<HistoryLeadsListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
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
      }
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
    </ContentBox>
  )
}

export default HistoryLeadsList
