import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ActiveLeadsTable from 'features/ActiveLeads/components/ActiveLeadsTable/ActiveLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchActiveLeadsList from 'features/ActiveLeads/hooks/useFetchActiveLeadsList.tsx'
import ActiveLeadsFilters from '../components/ActiveLeadsFilters'
import styles from './activeLeadsList.module.scss'
import {
  formatIndicator,
  formatMoneyIndicator,
  formatPercentageIndicator,
} from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type ActiveLeadsItem } from 'features/ActiveLeads/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { Drawer, IconButton, Tooltip } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/ActiveLeads/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import dateFormat from 'utils/dateFormat.ts'
import RefreshButton from 'components/RefreshButton'
import { type CallReportItem } from 'features/CallReport/types'
import { VisibilityOutlined } from '@mui/icons-material'
import PhoneLink from 'components/PhoneLink/PhoneLink.tsx'
import {
  ActiveLeadsListFiltersFormValues,
  DEFAULT_FILTERS,
} from '../components/ActiveLeadsFilters/ActiveLeadsFilters.tsx'

const ActiveLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'ActiveLeads' })
  const [selectedActiveLeads, setSelectedActiveLeads] = useState<ActiveLeadsItem | undefined>(
    undefined
  )

  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<ActiveLeadsListFiltersFormValues>(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl,
    DEFAULT_FILTERS
  )

  const {
    activeLeadsItems,
    activeLeadsAverages,
    activeLeadsPercentages,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchActiveLeadsList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/leads`,
    filters: filtersToAPI,
    fileName: 'active_leads',
  })

  const handleOpenActiveLeadsDetails = useCallback(
    (activeLeads: ActiveLeadsItem) => {
      setSelectedActiveLeads(activeLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedActiveLeads]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.data'),
        fieldName: 'data',
        sortable: false,
        dataModifier: (item: ActiveLeadsItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenActiveLeadsDetails(item)
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
        dataModifier: (item: ActiveLeadsItem) => (
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
        dataModifier: (item: ActiveLeadsItem) => item.pubListId,
      },
      {
        header: t('fields.subId'),
        fieldName: 'subId',
        sortable: true,
        dataModifier: (item: ActiveLeadsItem) => item.subId,
      },
      { header: t('fields.type'), fieldName: 'type', sortable: true },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: ActiveLeadsItem) => item.firstName,
      },
      {
        header: t('fields.lastName'),
        fieldName: 'last_name',
        sortable: true,
        dataModifier: (item: ActiveLeadsItem) => item.lastName,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
        dataModifier: (item: ActiveLeadsItem) => item.email,
      },
      {
        header: t('fields.cpl'),
        fieldName: 'cpl',
        sortable: true,
        dataModifier: (item: ActiveLeadsItem) => item.cpl,
      },
      {
        header: t('fields.leadDate'),
        fieldName: 'created_at',
        sortable: true,
        dataModifier: (data: CallReportItem) => dateFormat(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t]
  )

  const initialIndicators = [
    {
      name: t('indicators.totalSpend'),
      fieldName: 'totalSpend',
      value: formatMoneyIndicator(activeLeadsAverages?.totalSpend),
      growthPercentage: activeLeadsPercentages?.totalSpend,
    },
    {
      name: t('indicators.totalRevenue'),
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(activeLeadsAverages?.totalRevenue),
      growthPercentage: activeLeadsPercentages?.totalRevenue,
    },
    {
      name: t('indicators.totalProfit'),
      fieldName: 'totalProfit',
      value: formatMoneyIndicator(activeLeadsAverages?.totalProfit),
      growthPercentage: activeLeadsPercentages?.totalProfit,
    },
    {
      name: t('indicators.totalRoi'),
      fieldName: 'totalRoi',
      value: formatPercentageIndicator(activeLeadsAverages?.totalRoi),
      growthPercentage: activeLeadsPercentages?.totalRoi,
    },
    {
      name: t('indicators.totalLeads'),
      fieldName: 'totalLeads',
      value: formatIndicator(activeLeadsAverages?.totalLeads),
      growthPercentage: activeLeadsPercentages?.totalLeads,
    },
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: formatIndicator(activeLeadsAverages?.totalCalls),
      growthPercentage: activeLeadsPercentages?.totalCalls,
    },
    {
      name: t('indicators.totalUniqueCalls'),
      fieldName: 'totalUniqueCalls',
      value: formatIndicator(activeLeadsAverages?.totalUniqueCalls),
      growthPercentage: activeLeadsPercentages?.totalUniqueCalls,
    },
    {
      name: t('indicators.totalAnswered'),
      fieldName: 'totalAnswered',
      value: formatIndicator(activeLeadsAverages?.totalAnswered),
      growthPercentage: activeLeadsPercentages?.totalAnswered,
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: formatIndicator(activeLeadsAverages?.totalBillable),
      growthPercentage: activeLeadsPercentages?.totalBillable,
    },
    {
      name: t('indicators.totalConversion'),
      fieldName: 'totalConversion',
      value: formatPercentageIndicator(activeLeadsAverages?.totalConversion),
      growthPercentage: activeLeadsPercentages?.totalConversion,
    },
    {
      name: t('indicators.totalCallsToAnswered'),
      fieldName: 'totalCallsToAnswered',
      value: formatPercentageIndicator(activeLeadsAverages?.totalCallsToAnswered),
      growthPercentage: activeLeadsPercentages?.totalCallsToAnswered,
    },
    {
      name: t('indicators.totalAnsweredToBillable'),
      fieldName: 'totalAnsweredToBillable',
      value: formatPercentageIndicator(activeLeadsAverages?.totalAnsweredToBillable),
      growthPercentage: activeLeadsPercentages?.totalAnsweredToBillable,
    },
    {
      name: t('indicators.totalLeadsToCall'),
      fieldName: 'totalLeadsToCall',
      value: formatPercentageIndicator(activeLeadsAverages?.totalLeadsToCall),
      growthPercentage: activeLeadsPercentages?.totalLeadsToCall,
    },
    {
      name: t('indicators.totalCpl'),
      fieldName: 'totalCpl',
      value: formatMoneyIndicator(activeLeadsAverages?.totalCpl),
      growthPercentage: activeLeadsPercentages?.totalCpl,
    },
    {
      name: t('indicators.totalCpc'),
      fieldName: 'totalCpc',
      value: formatMoneyIndicator(activeLeadsAverages?.totalCpc),
      growthPercentage: activeLeadsPercentages?.totalCpc,
    },
    {
      name: t('indicators.totalCps'),
      fieldName: 'totalCps',
      value: formatMoneyIndicator(activeLeadsAverages?.totalCps),
      growthPercentage: activeLeadsPercentages?.totalCps,
    },
    {
      name: t('indicators.totalRpl'),
      fieldName: 'totalRpl',
      value: formatMoneyIndicator(activeLeadsAverages?.totalRpl),
      growthPercentage: activeLeadsPercentages?.totalRpl,
    },
    {
      name: t('indicators.totalRpc'),
      fieldName: 'totalRpc',
      value: formatMoneyIndicator(activeLeadsAverages?.totalRpc),
      growthPercentage: activeLeadsPercentages?.totalRpc,
    },
    {
      name: t('indicators.totalRps'),
      fieldName: 'totalRps',
      value: formatMoneyIndicator(activeLeadsAverages?.totalRps),
      growthPercentage: activeLeadsPercentages?.totalRps,
    },
    {
      name: t('indicators.totalSpendLeads'),
      fieldName: 'totalSpendLeads',
      value: formatMoneyIndicator(activeLeadsAverages?.totalSpendLeads),
      growthPercentage: activeLeadsPercentages?.totalSpendLeads,
    },
    {
      name: t('indicators.totalSpendCalls'),
      fieldName: 'totalSpendCalls',
      value: formatMoneyIndicator(activeLeadsAverages?.totalSpendCalls),
      growthPercentage: activeLeadsPercentages?.totalSpendCalls,
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
  } = useTableSettings(initialColumns, initialIndicators, 'activeLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <ActiveLeadsFilters
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
      <ActiveLeadsTable
        columns={visibleColumns}
        rows={activeLeadsItems}
        loading={loading}
        onClickView={handleOpenActiveLeadsDetails}
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
              <div className={styles.itemValue}>{selectedActiveLeads?.universalLeadId}</div>
            </div>
            {selectedActiveLeads?.trustedForm && (
              <div className={styles.item}>
                <div className={styles.itemLabel}>{t('details.trustedForm')}</div>
                <div className={styles.itemValue}>{selectedActiveLeads?.trustedForm}</div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default ActiveLeadsList
