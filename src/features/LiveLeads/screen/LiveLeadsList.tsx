import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LiveLeadsTable from 'features/LiveLeads/components/LiveLeadsTable/LiveLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchLiveLeadsList from 'features/LiveLeads/hooks/useFetchLiveLeadsList.tsx'
import LiveLeadsFilters from '../components/LiveLeadsFilters'
import styles from './liveLeadsList.module.scss'
import {
  formatIndicator,
  formatMoneyIndicator,
  formatPercentageIndicator,
} from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type LiveLeadsItem } from 'features/LiveLeads/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Drawer, IconButton, Tooltip } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersToApi,
  transformFiltersFromUrl,
  transformFiltersToUrl,
} from 'features/LiveLeads/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import dateFormat from 'utils/dateFormat.ts'
import RefreshButton from 'components/RefreshButton'
import { type CallReportItem } from 'features/CallReport/types'
import { VisibilityOutlined } from '@mui/icons-material'
import PhoneLink from 'components/PhoneLink/PhoneLink.tsx'
import {
  DEFAULT_FILTERS,
  type LiveLeadsListFiltersFormValues,
} from '../components/LiveLeadsFilters/LiveLeadsFilters.tsx'

const LiveLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'LiveLeads' })
  const [selectedLiveLeads, setSelectedLiveLeads] = useState<LiveLeadsItem | undefined>(undefined)

  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<LiveLeadsListFiltersFormValues>(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl,
    DEFAULT_FILTERS
  )

  const {
    liveLeadsItems,
    liveLeadsAverages,
    liveLeadsPercentages,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchLiveLeadsList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/leads`,
    filters: filtersToAPI,
    fileName: 'live_leads',
  })

  const handleOpenLiveLeadsDetails = useCallback(
    (liveLeads: LiveLeadsItem) => {
      setSelectedLiveLeads(liveLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedLiveLeads]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.data'),
        fieldName: 'data',
        sortable: false,
        dataModifier: (item: LiveLeadsItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenLiveLeadsDetails(item)
            }}
          >
            <Tooltip title={t('details.title')}>
              <VisibilityOutlined sx={{ fontSize: 14 }} />
            </Tooltip>
          </IconButton>
        ),
      },
      {
        header: t('fields.phone'),
        fieldName: 'phone_id',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => (
          <PhoneLink
            phone={item.phone}
            account={item.id}
            name={`${item.firstName} ${item.lastName}`}
            email={item.email ?? ''}
            typeOut={item.type ?? ''}
            vendor={item.pubListId ?? ''}
          />
        ),
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.pubListId,
      },
      {
        header: t('fields.pubIdYp'),
        fieldName: 'sub_id5',
        sortable: true,
        dataModifier: (data: LiveLeadsItem) => data.pubIdYp,
      },
      {
        header: t('fields.subId'),
        fieldName: 'subId',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.subId,
      },
      {
        header: t('fields.vendor'),
        fieldName: 'vendors_yp',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.vendorsYp,
      },
      { header: t('fields.type'), fieldName: 'type', sortable: true },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.firstName,
      },
      {
        header: t('fields.lastName'),
        fieldName: 'last_name',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.lastName,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.email,
      },
      {
        header: t('fields.cpl'),
        fieldName: 'cpl',
        sortable: true,
        dataModifier: (item: LiveLeadsItem) => item.cpl,
      },
      {
        header: t('fields.leadDate'),
        fieldName: 'created_at',
        sortable: true,
        dataModifier: (data: CallReportItem) => dateFormat(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t, filters?.startDate, filters?.endDate]
  )

  const initialIndicators = [
    {
      name: t('indicators.totalSpend'),
      fieldName: 'totalSpend',
      value: formatMoneyIndicator(liveLeadsAverages?.totalSpend),
      growthPercentage: liveLeadsPercentages?.totalSpend,
    },
    {
      name: t('indicators.totalSpendLeads'),
      fieldName: 'totalSpendLeads',
      value: formatMoneyIndicator(liveLeadsAverages?.totalSpendLeads),
    },
    {
      name: t('indicators.totalSpendCalls'),
      fieldName: 'totalSpendCalls',
      value: formatMoneyIndicator(liveLeadsAverages?.totalSpendCalls),
    },
    {
      name: t('indicators.totalRevenue'),
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(liveLeadsAverages?.totalRevenue),
      growthPercentage: liveLeadsPercentages?.totalRevenue,
    },
    {
      name: t('indicators.totalProfit'),
      fieldName: 'totalProfit',
      value: formatMoneyIndicator(liveLeadsAverages?.totalProfit),
      growthPercentage: liveLeadsPercentages?.totalProfit,
    },
    {
      name: t('indicators.totalRoi'),
      fieldName: 'totalRoi',
      value: formatPercentageIndicator(liveLeadsAverages?.totalRoi),
      growthPercentage: liveLeadsPercentages?.totalRoi,
    },
    {
      name: t('indicators.totalLeads'),
      fieldName: 'totalLeads',
      value: formatIndicator(liveLeadsAverages?.totalLeads),
      growthPercentage: liveLeadsPercentages?.totalLeads,
    },
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: formatIndicator(liveLeadsAverages?.totalCalls),
      growthPercentage: liveLeadsPercentages?.totalCalls,
    },
    {
      name: t('indicators.totalUniqueCalls'),
      fieldName: 'totalUniqueCalls',
      value: formatIndicator(liveLeadsAverages?.totalUniqueCalls),
      growthPercentage: liveLeadsPercentages?.totalUniqueCalls,
    },
    {
      name: t('indicators.totalAnswered'),
      fieldName: 'totalAnswered',
      value: formatIndicator(liveLeadsAverages?.totalAnswered),
      growthPercentage: liveLeadsPercentages?.totalAnswered,
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: formatIndicator(liveLeadsAverages?.totalBillable),
      growthPercentage: liveLeadsPercentages?.totalBillable,
    },
    {
      name: t('indicators.totalConversion'),
      fieldName: 'totalConversion',
      value: formatPercentageIndicator(liveLeadsAverages?.totalConversion),
      growthPercentage: liveLeadsPercentages?.totalConversion,
    },
    {
      name: t('indicators.totalCallsToAnswered'),
      fieldName: 'totalCallsToAnswered',
      value: formatPercentageIndicator(liveLeadsAverages?.totalCallsToAnswered),
      growthPercentage: liveLeadsPercentages?.totalCallsToAnswered,
    },
    {
      name: t('indicators.totalAnsweredToBillable'),
      fieldName: 'totalAnsweredToBillable',
      value: formatPercentageIndicator(liveLeadsAverages?.totalAnsweredToBillable),
      growthPercentage: liveLeadsPercentages?.totalAnsweredToBillable,
    },
    {
      name: t('indicators.totalLeadsToCall'),
      fieldName: 'totalLeadsToCall',
      value: formatPercentageIndicator(liveLeadsAverages?.totalLeadsToCall),
      growthPercentage: liveLeadsPercentages?.totalLeadsToCall,
    },
    {
      name: t('indicators.totalCpl'),
      fieldName: 'totalCpl',
      value: formatMoneyIndicator(liveLeadsAverages?.totalCpl),
      growthPercentage: liveLeadsPercentages?.totalCpl,
    },
    {
      name: t('indicators.totalCpc'),
      fieldName: 'totalCpc',
      value: formatMoneyIndicator(liveLeadsAverages?.totalCpc),
      growthPercentage: liveLeadsPercentages?.totalCpc,
    },
    {
      name: t('indicators.totalCps'),
      fieldName: 'totalCps',
      value: formatMoneyIndicator(liveLeadsAverages?.totalCps),
      growthPercentage: liveLeadsPercentages?.totalCps,
    },
    {
      name: t('indicators.totalRpl'),
      fieldName: 'totalRpl',
      value: formatMoneyIndicator(liveLeadsAverages?.totalRpl),
      growthPercentage: liveLeadsPercentages?.totalRpl,
    },
    {
      name: t('indicators.totalRpc'),
      fieldName: 'totalRpc',
      value: formatMoneyIndicator(liveLeadsAverages?.totalRpc),
      growthPercentage: liveLeadsPercentages?.totalRpc,
    },
    {
      name: t('indicators.totalRps'),
      fieldName: 'totalRps',
      value: formatMoneyIndicator(liveLeadsAverages?.totalRps),
      growthPercentage: liveLeadsPercentages?.totalRps,
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
  } = useTableSettings(initialColumns, initialIndicators, 'liveLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <LiveLeadsFilters
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
      <LiveLeadsTable
        columns={visibleColumns}
        rows={liveLeadsItems}
        loading={loading}
        onClickView={handleOpenLiveLeadsDetails}
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
              <div className={styles.itemLabel}>{t('details.jornayaId')}</div>
              <div className={styles.itemValue}>{selectedLiveLeads?.universalLeadId ?? '-'}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemLabel}>{t('details.trustedForm')}</div>
              <div className={styles.itemValue}>{selectedLiveLeads?.trustedForm ?? '-'}</div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default LiveLeadsList
