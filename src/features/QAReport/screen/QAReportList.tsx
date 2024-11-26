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
} from 'features/QAReport/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import RefreshButton from 'components/RefreshButton'
import useFetchQAReportList from 'features/QAReport/hooks/useFetchQAReportList.tsx'
import styles from './qaReportList.module.scss'
import QAReportTable from 'features/QAReport/components/CPAReportTable'
import { type QAReportItem } from 'features/QAReport/types'
import dateFormat from 'utils/dateFormat.ts'
import {
  DEFAULT_FILTERS,
  QAReportListFiltersFormValues,
} from '../components/QAReportFilters/QAReportFilters.tsx'

const QAReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'QAReport' })
  const { onCancel, onApply, filters, filtersToAPI } = useFilters<QAReportListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { qaReportIndicators, qaReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchQAReportList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/qa`,
    filters: filtersToAPI,
    fileName: 'qa_report',
  })

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.phone'),
        fieldName: 'phone_id',
        sortable: true,
        dataModifier: (item: QAReportItem) => item.phoneId,
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: QAReportItem) => item.pubListId,
      },
      { header: t('fields.offers'), fieldName: 'offers', sortable: true },
      {
        header: t('fields.vendorsTd'),
        fieldName: 'vendors_td',
        sortable: true,
        dataModifier: (item: QAReportItem) => item.vendorsTd,
      },
      { header: t('fields.buyersTd'), fieldName: 'buyers', sortable: true },
      { header: t('fields.statusTd'), fieldName: 'status', sortable: true },
      {
        header: t('fields.holdDurations'),
        fieldName: 'hold_durations',
        sortable: true,
        dataModifier: (item: QAReportItem) => item.holdDurations,
      },
      { header: t('fields.duration'), fieldName: 'durations', sortable: true },
      {
        header: t('fields.ivr'),
        fieldName: 'ivr',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.ivr ? t('yes') : t('no')),
      },
      {
        header: t('fields.adQualityError'),
        fieldName: 'ad_quality_error',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.adQualityError ? t('yes') : t('no')),
      },
      {
        header: t('fields.callDropped'),
        fieldName: 'call_dropped',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.callDropped ? t('yes') : t('no')),
      },
      {
        header: t('fields.notQualified'),
        fieldName: 'not_qualified',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.notQualified ? t('yes') : t('no')),
      },
      {
        header: t('fields.notInterested'),
        fieldName: 'not_interested',
        sortable: true,
        dataModifier: (item: QAReportItem) => (item.notInterested ? t('yes') : t('no')),
      },
      {
        header: t('fields.callDate'),
        fieldName: 'date_sale',
        sortable: true,
        dataModifier: (data: QAReportItem) => dateFormat(data.dateSale, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t]
  )

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
