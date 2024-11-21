import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PubLeadsTable from 'features/PubLeads/components/PubLeadsTable/PubLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchPubLeadsList from 'features/PubLeads/hooks/useFetchPubLeadsList.tsx'
import PubLeadsFilters from '../components/PubLeadsFilters'
import styles from './pubLeadsList.module.scss'
import {
  formatIndicator,
  formatMoneyIndicator,
  formatPercentageIndicator,
} from 'hooks/indicator.ts'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type PubLeadsItem } from 'features/PubLeads/types'
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
} from 'features/PubLeads/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import dateFormat from 'utils/dateFormat.ts'
import AccountCard from 'components/AccountCard'
import RefreshButton from 'components/RefreshButton'
import { type CallReportItem } from 'features/CallReport/types'
import { VisibilityOutlined } from '@mui/icons-material'
import PhoneLink from 'components/PhoneLink/PhoneLink.tsx'

const PubLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'PubLeads' })
  const [selectedPubLeads, setSelectedPubLeads] = useState<PubLeadsItem | undefined>(undefined)

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

  const {
    pubLeadsItems,
    pubLeadsAverages,
    pubLeadsPercentages,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchPubLeadsList({
    canSearch: !loadingFilters,
    filters: allFilters,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/leads`,
    filters: allFilters,
    fileName: 'pub_leads',
  })

  const handleOpenPubLeadsDetails = useCallback(
    (pubLeads: PubLeadsItem) => {
      setSelectedPubLeads(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedPubLeads]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.data'),
        fieldName: 'data',
        sortable: false,
        dataModifier: (item: PubLeadsItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenPubLeadsDetails(item)
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
        dataModifier: (item: PubLeadsItem) => (
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
        dataModifier: (item: PubLeadsItem) => item.pubListId,
      },
      {
        header: t('fields.subId'),
        fieldName: 'subId',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.subId,
      },
      {
        header: t('fields.vendor'),
        fieldName: 'vendors_yp',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.vendorsYp,
      },
      { header: t('fields.type'), fieldName: 'type', sortable: true },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.firstName,
      },
      {
        header: t('fields.lastName'),
        fieldName: 'last_name',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.lastName,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.email,
      },
      {
        header: t('fields.cpl'),
        fieldName: 'cpl',
        sortable: true,
        dataModifier: (item: PubLeadsItem) => item.cpl,
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
      value: formatMoneyIndicator(pubLeadsAverages?.totalSpend),
      growthPercentage: pubLeadsPercentages?.totalSpend,
    },
    {
      name: t('indicators.totalRevenue'),
      fieldName: 'totalRevenue',
      value: formatMoneyIndicator(pubLeadsAverages?.totalRevenue),
      growthPercentage: pubLeadsPercentages?.totalRevenue,
    },
    {
      name: t('indicators.totalProfit'),
      fieldName: 'totalProfit',
      value: formatMoneyIndicator(pubLeadsAverages?.totalProfit),
      growthPercentage: pubLeadsPercentages?.totalProfit,
    },
    {
      name: t('indicators.totalRoi'),
      fieldName: 'totalRoi',
      value: formatPercentageIndicator(pubLeadsAverages?.totalRoi),
      growthPercentage: pubLeadsPercentages?.totalRoi,
    },
    {
      name: t('indicators.totalLeads'),
      fieldName: 'totalLeads',
      value: formatIndicator(pubLeadsAverages?.totalLeads),
      growthPercentage: pubLeadsPercentages?.totalLeads,
    },
    {
      name: t('indicators.totalCalls'),
      fieldName: 'totalCalls',
      value: formatIndicator(pubLeadsAverages?.totalCalls),
      growthPercentage: pubLeadsPercentages?.totalCalls,
    },
    {
      name: t('indicators.totalUniqueCalls'),
      fieldName: 'totalUniqueCalls',
      value: formatIndicator(pubLeadsAverages?.totalUniqueCalls),
      growthPercentage: pubLeadsPercentages?.totalUniqueCalls,
    },
    {
      name: t('indicators.totalAnswered'),
      fieldName: 'totalAnswered',
      value: formatIndicator(pubLeadsAverages?.totalAnswered),
      growthPercentage: pubLeadsPercentages?.totalAnswered,
    },
    {
      name: t('indicators.totalBillable'),
      fieldName: 'totalBillable',
      value: formatIndicator(pubLeadsAverages?.totalBillable),
      growthPercentage: pubLeadsPercentages?.totalBillable,
    },
    {
      name: t('indicators.totalConversion'),
      fieldName: 'totalConversion',
      value: formatPercentageIndicator(pubLeadsAverages?.totalConversion),
      growthPercentage: pubLeadsPercentages?.totalConversion,
    },
    {
      name: t('indicators.totalCallsToAnswered'),
      fieldName: 'totalCallsToAnswered',
      value: formatPercentageIndicator(pubLeadsAverages?.totalCallsToAnswered),
      growthPercentage: pubLeadsPercentages?.totalCallsToAnswered,
    },
    {
      name: t('indicators.totalAnsweredToBillable'),
      fieldName: 'totalAnsweredToBillable',
      value: formatPercentageIndicator(pubLeadsAverages?.totalAnsweredToBillable),
      growthPercentage: pubLeadsPercentages?.totalAnsweredToBillable,
    },
    {
      name: t('indicators.totalLeadsToCall'),
      fieldName: 'totalLeadsToCall',
      value: formatPercentageIndicator(pubLeadsAverages?.totalLeadsToCall),
      growthPercentage: pubLeadsPercentages?.totalLeadsToCall,
    },
    {
      name: t('indicators.totalCpl'),
      fieldName: 'totalCpl',
      value: formatMoneyIndicator(pubLeadsAverages?.totalCpl),
      growthPercentage: pubLeadsPercentages?.totalCpl,
    },
    {
      name: t('indicators.totalCpc'),
      fieldName: 'totalCpc',
      value: formatMoneyIndicator(pubLeadsAverages?.totalCpc),
      growthPercentage: pubLeadsPercentages?.totalCpc,
    },
    {
      name: t('indicators.totalCps'),
      fieldName: 'totalCps',
      value: formatMoneyIndicator(pubLeadsAverages?.totalCps),
      growthPercentage: pubLeadsPercentages?.totalCps,
    },
    {
      name: t('indicators.totalRpl'),
      fieldName: 'totalRpl',
      value: formatMoneyIndicator(pubLeadsAverages?.totalRpl),
      growthPercentage: pubLeadsPercentages?.totalRpl,
    },
    {
      name: t('indicators.totalRpc'),
      fieldName: 'totalRpc',
      value: formatMoneyIndicator(pubLeadsAverages?.totalRpc),
      growthPercentage: pubLeadsPercentages?.totalRpc,
    },
    {
      name: t('indicators.totalRps'),
      fieldName: 'totalRps',
      value: formatMoneyIndicator(pubLeadsAverages?.totalRps),
      growthPercentage: pubLeadsPercentages?.totalRps,
    },
    {
      name: t('indicators.totalSpendLeads'),
      fieldName: 'totalSpendLeads',
      value: formatMoneyIndicator(pubLeadsAverages?.totalSpendLeads),
      growthPercentage: pubLeadsPercentages?.totalSpendLeads,
    },
    {
      name: t('indicators.totalSpendCalls'),
      fieldName: 'totalSpendCalls',
      value: formatMoneyIndicator(pubLeadsAverages?.totalSpendCalls),
      growthPercentage: pubLeadsPercentages?.totalSpendCalls,
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
  } = useTableSettings(initialColumns, initialIndicators, 'pubLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <PubLeadsFilters
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
      <AccountCard
        account={initialFilters.account}
        name={initialFilters.name}
        email={initialFilters.email}
        typeOut={initialFilters.type_out}
        vendor={initialFilters.vendor}
        phone={initialFilters.phone}
      />
      <PubLeadsTable
        columns={visibleColumns}
        rows={pubLeadsItems}
        loading={loading}
        onClickView={handleOpenPubLeadsDetails}
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
              <div className={styles.itemValue}>{selectedPubLeads?.universalLeadId}</div>
            </div>
            {selectedPubLeads?.trustedForm && (
              <div className={styles.item}>
                <div className={styles.itemLabel}>{t('details.trustedForm')}</div>
                <div className={styles.itemValue}>{selectedPubLeads?.trustedForm}</div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default PubLeadsList
