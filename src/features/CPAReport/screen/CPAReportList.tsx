import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import CPAReportFilters from '../components/CPAReportFilters'
import { formatMoneyIndicator } from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Drawer } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
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
import CPAReportItemCard from 'components/CPAReportItemCard'

const CPAReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CPAReport' })
  const [selectedCPAReport, setSelectedCPAReport] = useState<CPAReportItem | undefined>(undefined)

  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const {
    onCancel,
    onApply,
    filters,
    initialFilters,
    loading: loadingFilters,
  } = useFilters(transformFiltersToApi, transformFiltersFromUrl, transformFiltersToUrl)
  const allFilters = useMemo(() => {
    return {
      ...filters,
    }
  }, [filters])

  const { cpaReportIndicators, cpaReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchCPAReportList({
      canSearch: !loadingFilters,
      filters: allFilters,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/api/data/report-cpa`,
    filters: allFilters,
    fileName: 'cpa_report',
  })

  const handleOpenCallReportDetails = useCallback(
    (callReport: CPAReportItem) => {
      setSelectedCPAReport(callReport)
      setCollapsedViewDetails(false)
    },
    [setCollapsedViewDetails, setSelectedCPAReport]
  )

  const initialColumns = useMemo(
    () => [
      { header: t('fields.name'), fieldName: 'buyerName', sortable: true },
      { header: t('fields.uniqueCalls'), fieldName: 'totalUnique', sortable: true },
      { header: t('fields.ucr'), fieldName: 'total_ucr', sortable: true },
      { header: t('fields.cpa'), fieldName: 'total_cpa', sortable: true },
      { header: t('fields.costPerCalls'), fieldName: 'totalRevenue', sortable: true },
      { header: t('fields.billable'), fieldName: 'totalBillables', sortable: true },
      { header: t('fields.sales'), fieldName: 'totalSales', sortable: true },
      { header: t('fields.state'), fieldName: 'state', sortable: true },
      { header: t('fields.totalCost'), fieldName: 'totalCost', sortable: true },
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
          initialFilters={initialFilters}
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
        onClickView={handleOpenCallReportDetails}
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
        <DrawerHeader title={selectedCPAReport?.buyerName ?? ''} onClose={toggleViewDetails} />
        <DrawerContent>
          <div className={styles.selectedChildren}>
            {selectedCPAReport?.children?.map((child, index) => (
              <CPAReportItemCard key={index + child.buyerName} item={child} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default CPAReportList
