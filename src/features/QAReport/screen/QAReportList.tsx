import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import QAReportFilters from '../components/QAReportFilters'
import { formatIndicator, formatPercentageIndicator } from 'hooks/indicator.ts'
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
import useFetchQAReportList from 'features/QAReport/hooks/useFetchQAReportList.tsx'
import styles from './qaReportList.module.scss'
import QAReportTable from 'features/QAReport/components/CPAReportTable'
import { type QAReportItem } from 'features/QAReport/types'
import { type CallReportItem } from 'features/CallReport/types'
import dateFormat from 'utils/dateFormat.ts'

const QAReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'QAReport' })
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

  const { qaReportIndicators, qaReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchQAReportList({
      canSearch: !loadingFilters,
      filters: allFilters,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/api/data/report-cpa`,
    filters: allFilters,
    fileName: 'qa_report',
  })

  const initialColumns = useMemo(
    () => [
      { header: t('fields.phone'), fieldName: 'phoneId', sortable: true },
      { header: t('fields.pubId'), fieldName: 'pubListId', sortable: true },
      { header: t('fields.offers'), fieldName: 'offers', sortable: true },
      { header: t('fields.vendorsTd'), fieldName: 'vendorsTd', sortable: true },
      { header: t('fields.buyersTd'), fieldName: 'buyers', sortable: true },
      { header: t('fields.statusTd'), fieldName: 'status', sortable: true },
      { header: t('fields.holdDurations'), fieldName: 'holdDurations', sortable: true },
      { header: t('fields.duration'), fieldName: 'durations', sortable: true },
      {
        header: t('fields.ivr'),
        fieldName: 'ivr',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.ivr ? t('yes') : t('no')),
      },
      {
        header: t('fields.adQualityError'),
        fieldName: 'adQualityError',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.adQualityError ? t('yes') : t('no')),
      },
      {
        header: t('fields.callDropped'),
        fieldName: 'callDropped',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.callDropped ? t('yes') : t('no')),
      },
      {
        header: t('fields.notQualified'),
        fieldName: 'notQualified',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.notQualified ? t('yes') : t('no')),
      },
      {
        header: t('fields.notInterested'),
        fieldName: 'notInterested',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.notInterested ? t('yes') : t('no')),
      },
      {
        header: t('fields.callDate'),
        fieldName: 'date_sale',
        sortable: true,
        dataModifier: (data: CallReportItem) => dateFormat(data.dateSale, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t]
  )

  // QAReportItem {
  //   vendorsTd: string
  //   buyerId: number
  //   buyers: string
  //   phoneId: number
  //   durations: string
  //   oDurations: number
  //   createdAt: string | null
  //   offers: string
  //   pubListId: number
  //   dateSale: string
  //   trafficSourceId: number
  //   adQualityError: boolean
  //   notInterested: boolean
  //   notQualified: boolean
  //   callDropped: boolean
  //   ivr: boolean
  //   holdDurations: string
  //   oHoldDurations: number
  //   statusTd: string
  //   reachedAgent: boolean
  //   callerHungUp: number
  //   state: string
  // }

  const initialIndicators = [
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: formatIndicator(qaReportIndicators?.totalCalls),
    },
    {
      name: t('indicators.totalAdQualityError'),
      fieldName: 'totalAdQualityError',
      value: formatPercentageIndicator(qaReportIndicators?.totalAdQualityError),
    },
    {
      name: t('indicators.totalReachedAgent'),
      fieldName: 'totalReachedAgent',
      value: qaReportIndicators?.totalReachedAgent,
    },
    {
      name: t('indicators.totalIvrQ'),
      fieldName: 'totalIvrQ',
      value: qaReportIndicators?.totalIvrQ,
    },
    {
      name: t('indicators.totalAvgDurations'),
      fieldName: 'totalAvgDurations',
      value: qaReportIndicators?.totalAvgDurations,
    },
    {
      name: t('indicators.totalTenHoldDurationsQ'),
      fieldName: 'totalTenHoldDurationsQ',
      value: qaReportIndicators?.totalTenHoldDurationsQ,
    },
    {
      name: t('indicators.totalCallerHungUpQ'),
      fieldName: 'totalCallerHungUpQ',
      value: qaReportIndicators?.totalCallerHungUpQ,
    },
    {
      name: t('indicators.totalNotQualifiedQ'),
      fieldName: 'totalNotQualifiedQ',
      value: qaReportIndicators?.totalNotQualifiedQ,
    },
    {
      name: t('indicators.totalNotInterestedQ'),
      fieldName: 'totalNotInterestedQ',
      value: qaReportIndicators?.totalNotInterestedQ,
    },
    {
      name: t('indicators.totalCallDroppedQ'),
      fieldName: 'totalCallDroppedQ',
      value: qaReportIndicators?.totalCallDroppedQ,
    },
    {
      name: t('indicators.totalReachedAgentPercentage'),
      fieldName: 'totalReachedAgent',
      value: formatPercentageIndicator(qaReportIndicators?.totalReachedAgent),
    },
    {
      name: t('indicators.totalIvrPercentage'),
      fieldName: 'totalIvr',
      value: formatPercentageIndicator(qaReportIndicators?.totalIvr),
    },
    {
      name: t('indicators.totalAvgHoldDurations'),
      fieldName: 'totalAvgHoldDurations',
      value: qaReportIndicators?.totalAvgHoldDurations,
    },
    {
      name: t('indicators.totalTenHoldDurationsPercentage'),
      fieldName: 'totalTenHoldDurations',
      value: formatPercentageIndicator(qaReportIndicators?.totalTenHoldDurations),
    },
    {
      name: t('indicators.totalCallerHungUpPercentage'),
      fieldName: 'totalCallerHungUp',
      value: formatPercentageIndicator(qaReportIndicators?.totalCallerHungUp),
    },
    {
      name: t('indicators.totalNotQualifiedPercentage'),
      fieldName: 'totalNotQualified',
      value: formatPercentageIndicator(qaReportIndicators?.totalNotQualified),
    },
    {
      name: t('indicators.totalNotInterestedPercentage'),
      fieldName: 'totalNotInterested',
      value: formatPercentageIndicator(qaReportIndicators?.totalNotInterested),
    },
    {
      name: t('indicators.totalCallDroppedPercentage'),
      fieldName: 'totalCallDropped',
      value: formatPercentageIndicator(qaReportIndicators?.totalCallDropped),
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
  } = useTableSettings(initialColumns, initialIndicators, 'qaReport')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <QAReportFilters
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
      <QAReportTable
        columns={visibleColumns}
        rows={qaReportItems}
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

export default QAReportList
