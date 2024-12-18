import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/PhoneRoomPerformance/transformers'
import RefreshButton from 'components/RefreshButton'
import { type PhoneRoomPerformanceItem } from 'features/PhoneRoomPerformance/types'
import styles from './phoneRoomPerformanceList.module.scss'
import useFetchPhoneRoomPerformanceList from 'features/PhoneRoomPerformance/hooks/useFetchPhoneRoomPerformanceList.tsx'
import PhoneRoomPerformanceFilters, {
  DEFAULT_FILTERS,
} from '../components/PhoneRoomPerformanceFilters/PhoneRoomPerformanceFilters.tsx'
import PhoneRoomPerformanceTable from 'features/PhoneRoomPerformance/components/PhoneRoomPerformanceTable'

const PhoneRoomPerformanceList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomPerformance' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { phoneRoomPerformanceItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchPhoneRoomPerformanceList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.pubId'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.pubListId,
      },
      {
        header: t('fields.subId'),
        fieldName: 'sub_id',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.subId,
      },
      {
        header: t('fields.recordCount'),
        fieldName: 'record_count',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.recordCount,
      },
      {
        header: t('fields.totalDials'),
        fieldName: 'call_count',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.recordCount,
      },
      {
        header: t('fields.avgDials'),
        fieldName: 'avg_dials',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.avgDials,
      },
      {
        header: t('fields.contactRate'),
        fieldName: 'contact_rate',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.contactRate,
      },
      {
        header: t('fields.transferRate'),
        fieldName: 'transfer_rate',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.transferRate,
      },
      {
        header: t('fields.costRecord'),
        fieldName: 'cost_record',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.costRecord,
      },
      {
        header: t('fields.revRecord'),
        fieldName: 'rev_record',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.revRecord,
      },
      {
        header: t('fields.profitRecord'),
        fieldName: 'profit_record',
        sortable: true,
        dataModifier: (item: PhoneRoomPerformanceItem) => item.profitRecord,
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
    resetToDefaultSettings,
    visibleColumns,
    reorderIndicators,
    toggleColumnVisibility,
    toggleIndicatorVisibility,
  } = useTableSettings(initialColumns, [], 'phoneRoomPerformance')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <PhoneRoomPerformanceFilters
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
      <PhoneRoomPerformanceTable
        columns={visibleColumns}
        rows={phoneRoomPerformanceItems}
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

export default PhoneRoomPerformanceList
