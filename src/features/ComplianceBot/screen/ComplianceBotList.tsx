import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/ComplianceBot/transformers'
import RefreshButton from 'components/RefreshButton'
import { type ComplianceBotItem } from 'features/ComplianceBot/types'
import styles from './complianceBotList.module.scss'
import useFetchComplianceBotList from 'features/ComplianceBot/hooks/useFetchComplianceBotList.tsx'
import ComplianceBotFilters, {
  DEFAULT_FILTERS,
} from '../components/ComplianceBotFilters/ComplianceBotFilters.tsx'
import dateFormat from 'utils/dateFormat.ts'
import ComplianceBotDetails from 'src/features/ComplianceBot/components/ComplianceBotDetails'
import { IconButton, Tooltip } from '@mui/material'
import { VisibilityOutlined } from '@mui/icons-material'
import ComplianceBotTable from 'features/ComplianceBot/components/ComplianceBotTable'
import LeadType from 'components/LeadType'

const ComplianceBotList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'ComplianceBot' })

  const [collapsedDetails, setCollapsedDetails] = useState(true)
  const [selectedComplianceBot, setSelectedComplianceBot] = useState<ComplianceBotItem>()

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const {
    complianceBotIndicators,
    complianceBotItems,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchComplianceBotList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const toggleDetails = useCallback(() => {
    setCollapsedDetails(!collapsedDetails)
  }, [setCollapsedDetails, collapsedDetails])

  const handleOpenItemDetails = useCallback(
    (complianceBotItem: ComplianceBotItem) => {
      setSelectedComplianceBot(complianceBotItem)
      toggleDetails()
    },
    [toggleDetails, setCollapsedDetails]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.phone'),
        fieldName: 'phone_bot',
        sortable: true,
        dataModifier: (item: ComplianceBotItem) => item.phoneBot,
      },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: ComplianceBotItem) => item.firstName,
      },
      {
        header: t('fields.lastName'),
        fieldName: 'last_name',
        sortable: true,
        dataModifier: (item: ComplianceBotItem) => item.lastName,
      },
      {
        header: t('fields.leadType'),
        fieldName: 'type',
        sortable: true,
        dataModifier: () => <LeadType type="MC" />,
      },
      {
        header: t('fields.zipCode'),
        fieldName: 'zip_code',
        sortable: true,
        dataModifier: (item: ComplianceBotItem) => item.zipCode,
      },
      {
        header: t('fields.universalLeadId'),
        fieldName: 'universal_lead_id',
        sortable: true,
        dataModifier: (item: ComplianceBotItem) => item.universalLeadId,
      },
      {
        header: t('fields.trust'),
        fieldName: 'trust',
        sortable: false,
        dataModifier: (item: ComplianceBotItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenItemDetails(item)
            }}
          >
            <Tooltip title={t('details.title')}>
              <VisibilityOutlined sx={{ fontSize: 14 }} />
            </Tooltip>
          </IconButton>
        ),
      },
      {
        header: t('fields.createdAt'),
        fieldName: 'date_history',
        sortable: true,
        dataModifier: (data: ComplianceBotItem) =>
          dateFormat(data.dateHistory, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t, handleOpenItemDetails]
  )

  const initialIndicators = [
    {
      name: t('indicators.total'),
      fieldName: 'total',
      value: complianceBotIndicators?.total,
    },
    {
      name: t('indicators.totalProcessed'),
      fieldName: 'totalProcessed',
      value: complianceBotIndicators?.totalProcessed,
    },
    {
      name: t('indicators.totalClean'),
      fieldName: 'totalClean',
      value: complianceBotIndicators?.totalClean,
      percent: complianceBotIndicators?.totalCleanPercent,
    },
    {
      name: t('indicators.totalFraud'),
      fieldName: 'totalFraud',
      value: complianceBotIndicators?.totalFraud,
      percent: complianceBotIndicators?.totalFraudPercent,
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
  } = useTableSettings(initialColumns, initialIndicators, 'complianceBot')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <ComplianceBotFilters
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
      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <ComplianceBotTable
        columns={visibleColumns}
        rows={complianceBotItems}
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
      <ComplianceBotDetails
        open={!collapsedDetails}
        onClose={toggleDetails}
        complianceBot={selectedComplianceBot}
      />
    </ContentBox>
  )
}

export default ComplianceBotList
