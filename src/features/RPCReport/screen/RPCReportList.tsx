import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import RPCReportFilters from '../components/RPCReportFilters/index.ts'
import { formatMoneyIndicator } from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/RPCReport/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import RefreshButton from 'components/RefreshButton'
import RPCReportTable from 'features/RPCReport/components/RPCReportTable'
import { type RPCReportItem } from 'features/RPCReport/types'
import styles from './rpcReportList.module.scss'
import useFetchRPCReportList from 'features/RPCReport/hooks/useFetchRPCReportList.tsx'
import { DEFAULT_FILTERS } from '../components/RPCReportFilters/RPCReportFilters.tsx'

const RPCReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'RPCReport' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { rpcReportIndicators, rpcReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchRPCReportList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/rpc`,
    filters: filtersToAPI,
    fileName: 'rpc_report',
  })

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'buyer_name',
        sortable: true,
        dataModifier: (item: RPCReportItem) => item.buyerName,
      },
      {
        header: t('fields.rpc'),
        fieldName: 'total_rpc',
        sortable: true,
        dataModifier: (item: RPCReportItem) => item.totalRpc,
      },
      {
        header: t('fields.uniqueCalls'),
        fieldName: 'total_unique',
        sortable: true,
        dataModifier: (item: RPCReportItem) => item.totalUnique,
      },
      {
        header: t('fields.revenue'),
        fieldName: 'total_revenue',
        sortable: true,
        dataModifier: (item: RPCReportItem) => item.totalRevenue,
      },
      {
        header: t('fields.billable'),
        fieldName: 'total_billables',
        sortable: true,
        dataModifier: (item: RPCReportItem) => item.totalBillables,
      },
      {
        header: t('fields.durations'),
        fieldName: 'total_durations',
        sortable: true,
        dataModifier: (item) => item.totalDurations,
      },
      { header: t('fields.state'), fieldName: 'state', sortable: true },
    ],
    [t]
  )

  const initialIndicators = [
    {
      name: t('indicators.rpc'),
      fieldName: 'rpc',
      value: rpcReportIndicators?.totalRpc,
    },
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: rpcReportIndicators?.totalCalls,
    },

    {
      name: t('indicators.uniqueCalls'),
      fieldName: 'uniqueCalls',
      value: rpcReportIndicators?.totalUnique,
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: rpcReportIndicators?.totaBillables,
    },
    {
      name: t('indicators.revenue'),
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(rpcReportIndicators?.totalRevenue),
    },
    {
      name: t('indicators.profit'),
      fieldName: 'totalProfit',
      value: rpcReportIndicators?.totalProfit,
    },
  ]

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
  } = useTableSettings(initialColumns, initialIndicators, 'rpcReport')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <RPCReportFilters
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
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <ExportButton onExport={doFetch} />
      </div>
      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <RPCReportTable
        columns={visibleColumns}
        rows={rpcReportItems}
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

export default RPCReportList
