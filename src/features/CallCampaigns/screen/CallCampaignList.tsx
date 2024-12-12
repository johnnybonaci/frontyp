import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import CallCampaignFilters from '../components/CallCampaignFilters/index.ts'
import {
  formatIndicator,
  formatMoneyIndicator,
  formatPercentageIndicator,
} from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import { transformFiltersFromUrl, transformFiltersToApi } from 'features/CallCampaigns/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import RefreshButton from 'components/RefreshButton'
import useFetchCallCampaignList from 'features/CallCampaigns/hooks/useFetchCallCampaignList.tsx'
import styles from './callCampaignList.module.scss'
import CallCampaignTable from 'features/CallCampaigns/components/CallCampaignTable'
import {
  DEFAULT_FILTERS,
  type CallCampaignListFiltersFormValues,
} from '../components/CallCampaignFilters/CallCampaignFilters.tsx'

const CallCampaignList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CallCampaign' })
  const { onCancel, onApply, filters, filtersToAPI } =
    useFilters<CallCampaignListFiltersFormValues>(
      DEFAULT_FILTERS,
      transformFiltersToApi,
      transformFiltersFromUrl
    )

  const {
    callCampaignIndicators,
    callCampaignItems,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchCallCampaignList({
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
        header: t('fields.campaignName'),
        fieldName: 'subId3',
        sortName: 'sub_id3',
        sortable: true,
      },
      {
        header: t('fields.vendorsTd'),
        fieldName: 'vendorsTd',
        sortName: 'vendors_td',
        sortable: true,
      },
      {
        header: t('fields.subId4'),
        fieldName: 'subId4',
        sortName: 'sub_id4',
        sortable: true,
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pubId',
        sortName: 'pub_id',
        sortable: true,
      },
      {
        header: t('fields.subId2'),
        fieldName: 'subId2',
        sortName: 'sub_id2',
        sortable: true,
      },
      {
        header: t('fields.vendorsYp'),
        fieldName: 'vendorsYp',
        sortName: 'vendors_yp',
        sortable: true,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortName: 'type',
        sortable: true,
      },
      {
        header: t('fields.totalLeads'),
        fieldName: 'totalLeads',
        sortName: 'total_leads',
        sortable: true,
      },
      {
        header: t('fields.totalCalls'),
        fieldName: 'totalCalls',
        sortName: 'total_calls',
        sortable: true,
      },
      {
        header: t('fields.totalAnswered'),
        fieldName: 'totalAnswered',
        sortName: 'total_answered',
        sortable: true,
      },
      {
        header: t('fields.totalBillable'),
        fieldName: 'totalSales',
        sortName: 'total_sales',
        sortable: true,
      },
      {
        header: t('fields.totalSpend'),
        fieldName: 'totalSpend',
        sortName: 'total_spend',
        sortable: true,
      },
      {
        header: t('fields.totalSpendLeads'),
        fieldName: 'totalSpendLeads',
        sortName: 'total_spend_leads',
        sortable: true,
      },
      {
        header: t('fields.totalSpendLeads'),
        fieldName: 'totalSpendLeads',
        sortName: 'total_spend_leads',
        sortable: true,
      },
      {
        header: t('fields.totalSpendCalls'),
        fieldName: 'totalSpendCalls',
        sortName: 'total_spend_calls',
        sortable: true,
      },
      {
        header: t('fields.grossRevenue'),
        fieldName: 'grossRevenue',
        sortName: 'gross_revenue',
        sortable: true,
      },
      {
        header: t('fields.grossProfit'),
        fieldName: 'grossProfit',
        sortName: 'gross_profit',
        sortable: true,
      },
      {
        header: t('fields.grossMargin'),
        fieldName: 'grossMargin',
        sortName: 'gross_margin',
        sortable: true,
      },
      {
        header: t('fields.costPerLead'),
        fieldName: 'costPerLead',
        sortName: 'cost_per_lead',
        sortable: true,
      },
      {
        header: t('fields.costPerLead'),
        fieldName: 'costPerLead',
        sortName: 'cost_per_lead',
        sortable: true,
      },
      {
        header: t('fields.revPerLead'),
        fieldName: 'revPerLead',
        sortName: 'rev_per_lead',
        sortable: true,
      },
      {
        header: t('fields.costPerCalls'),
        fieldName: 'costPerCalls',
        sortName: 'cost_per_calls',
        sortable: true,
      },
      {
        header: t('fields.revPerCalls'),
        fieldName: 'revPerCalls',
        sortName: 'rev_per_calls',
        sortable: true,
      },
      {
        header: t('fields.costPerSales'),
        fieldName: 'costPerSales',
        sortName: 'cost_per_sales',
        sortable: true,
      },
      {
        header: t('fields.revenuePerSale'),
        fieldName: 'revenuePerSale',
        sortName: 'revenue_per_sale',
        sortable: true,
      },
      {
        header: t('fields.callPer'),
        fieldName: 'callPer',
        sortName: 'call_per',
        sortable: true,
      },
      {
        header: t('fields.cpaPer'),
        fieldName: 'cpaPer',
        sortName: 'cpa_per',
        sortable: true,
      },
    ],
    [t]
  )

  const initialIndicators = [
    {
      name: t('indicators.totalSpend'),
      fieldName: 'totalSpend',
      value: formatMoneyIndicator(callCampaignIndicators?.totalSpend),
    },
    {
      name: t('indicators.totalSpendLeads'),
      fieldName: 'totalSpendLeads',
      value: formatMoneyIndicator(callCampaignIndicators?.totalSpendLeads),
    },
    {
      name: t('indicators.totalSpendCalls'),
      fieldName: 'totalSpendCalls',
      value: formatMoneyIndicator(callCampaignIndicators?.totalSpendCalls),
    },
    {
      name: t('indicators.totalRevenue'),
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(callCampaignIndicators?.totalRevenue),
    },
    {
      name: t('indicators.totalProfit'),
      fieldName: 'totalProfit',
      value: formatMoneyIndicator(callCampaignIndicators?.totalProfit),
    },
    {
      name: t('indicators.totalRoi'),
      fieldName: 'totalRoi',
      value: formatPercentageIndicator(callCampaignIndicators?.totalRoi),
    },
    {
      name: t('indicators.totalLeads'),
      fieldName: 'totalLeads',
      value: formatIndicator(callCampaignIndicators?.totalLeads),
    },
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: formatIndicator(callCampaignIndicators?.totalCalls),
    },
    {
      name: t('indicators.totalUniquecalls'),
      fieldName: 'totalUniquecalls',
      value: formatIndicator(callCampaignIndicators?.totalUniquecalls),
    },
    {
      name: t('indicators.totalAnswered'),
      fieldName: 'totalAnswered',
      value: formatIndicator(callCampaignIndicators?.totalAnswered),
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: formatIndicator(callCampaignIndicators?.totalBillable),
    },
    {
      name: t('indicators.totalConvertion'),
      fieldName: 'totalConvertion',
      value: formatPercentageIndicator(callCampaignIndicators?.totalConvertion),
    },
    {
      name: t('indicators.totalCallstoanswered'),
      fieldName: 'totalCallstoanswered',
      value: formatPercentageIndicator(callCampaignIndicators?.totalCallstoanswered),
    },
    {
      name: t('indicators.totalAnsweredtobillable'),
      fieldName: 'totalAnsweredtobillable',
      value: formatPercentageIndicator(callCampaignIndicators?.totalAnsweredtobillable),
    },
    {
      name: t('indicators.totalLeadstocall'),
      fieldName: 'totalLeadstocall',
      value: formatPercentageIndicator(callCampaignIndicators?.totalLeadstocall),
    },
    {
      name: t('indicators.totalCpl'),
      fieldName: 'totalCpl',
      value: formatMoneyIndicator(callCampaignIndicators?.totalCpl),
    },
    {
      name: t('indicators.totalRpl'),
      fieldName: 'totalRpl',
      value: formatMoneyIndicator(callCampaignIndicators?.totalRpl),
    },
    {
      name: t('indicators.totalCpc'),
      fieldName: 'totalCpc',
      value: formatMoneyIndicator(callCampaignIndicators?.totalCpc),
    },
    {
      name: t('indicators.totalRpc'),
      fieldName: 'totalRpc',
      value: formatMoneyIndicator(callCampaignIndicators?.totalRpc),
    },
    {
      name: t('indicators.totalCps'),
      fieldName: 'totalCps',
      value: formatMoneyIndicator(callCampaignIndicators?.totalCps),
    },
    {
      name: t('indicators.totalRps'),
      fieldName: 'totalRps',
      value: formatMoneyIndicator(callCampaignIndicators?.totalRps),
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
  } = useTableSettings(initialColumns, initialIndicators, 'campaigns')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <CallCampaignFilters
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
      <CallCampaignTable
        columns={visibleColumns}
        rows={callCampaignItems}
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

export default CallCampaignList
