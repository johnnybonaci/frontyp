import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import CPAReportFilters from '../components/CPAReportFilters'
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
} from 'features/CPAReport/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import RefreshButton from 'components/RefreshButton'
import CPAReportTable from 'features/CPAReport/components/CPAReportTable'
import { type CPAReportItem } from 'features/CPAReport/types'
import styles from './cpaReportList.module.scss'
import useFetchCPAReportList from 'features/CPAReport/hooks/useFetchCPAReportList.tsx'
import { DEFAULT_FILTERS } from '../components/CPAReportFilters/CPAReportFilters.tsx'

const CPAReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CPAReport' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl,
    DEFAULT_FILTERS
  )

  const { cpaReportIndicators, cpaReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchCPAReportList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/cpa`,
    filters: filtersToAPI,
    fileName: 'cpa_report',
  })

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'buyer_name',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.buyerName,
      },
      {
        header: t('fields.uniqueCalls'),
        fieldName: 'total_unique',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalUnique,
      },
      {
        header: t('fields.ucr'),
        fieldName: 'total_ucr',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalUcr + '%',
      },
      {
        header: t('fields.variations'),
        fieldName: 'total_ucr_1',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.variations,
      },
      {
        header: t('fields.cpa'),
        fieldName: 'total_cpa',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalCpa,
      },
      {
        header: t('fields.costPerCalls'),
        fieldName: 'total_revenue',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalRevenue,
      },
      {
        header: t('fields.billable'),
        fieldName: 'total_billables',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalBillables,
      },
      {
        header: t('fields.sales'),
        fieldName: 'total_sales',
        sortable: true,
        dataModifier: (item: CPAReportItem) => item.totalSales,
      },
      { header: t('fields.state'), fieldName: 'state', sortable: true },
      {
        header: t('fields.totalCost'),
        fieldName: 'total_cost',
        sortable: true,
        dataModifier: (item) => item.totalCost,
      },
    ],
    [t]
  )

  const initialIndicators = [
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: cpaReportIndicators?.totalCalls,
    },
    {
      name: t('indicators.cpa'),
      fieldName: 'cpa',
      value: cpaReportIndicators?.totalCpa,
    },
    {
      name: t('indicators.billableCalls'),
      fieldName: 'billableCalls',
      value: cpaReportIndicators?.totalBillables,
    },
    {
      name: t('indicators.sales'),
      fieldName: 'sales',
      value: cpaReportIndicators?.totalSales,
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: formatMoneyIndicator(cpaReportIndicators?.totalCost),
    },
    {
      name: t('indicators.duration'),
      fieldName: 'duration',
      value: cpaReportIndicators?.totalDurations,
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
  } = useTableSettings(initialColumns, initialIndicators, 'cpaReport')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <CPAReportFilters
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
      <CPAReportTable
        columns={visibleColumns}
        rows={cpaReportItems}
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

export default CPAReportList
