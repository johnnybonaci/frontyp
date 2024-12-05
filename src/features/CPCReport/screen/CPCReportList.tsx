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
} from 'features/CPCReport/transformers'
import ExportButton from 'components/ExportButton'
import useExport from 'hooks/useExport.tsx'
import config from '../../../config.tsx'
import RefreshButton from 'components/RefreshButton'
import { type CPCReportItem } from 'features/CPCReport/types'
import styles from './cpcReportList.module.scss'
import useFetchCPCReportList from 'features/CPCReport/hooks/useFetchCPCReportList.tsx'
import CPCReportFilters, {
  DEFAULT_FILTERS,
} from '../components/CPCReportFilters/CPCReportFilters.tsx'
import dateFormat from 'utils/dateFormat.ts'
import CPCReportTable from 'features/CPCReport/components/CPCReportTable'
import CPCReportDetails from 'features/CPCReport/components/CpcReportDetails'
import { IconButton, Tooltip } from '@mui/material'
import { VisibilityOutlined } from '@mui/icons-material'

const CPCReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'CPCReport' })

  const [collapsedDetails, setCollapsedDetails] = useState(true)
  const [selectedCPCReport, setSelectedCPCReport] = useState<CPCReportItem>()

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { cpcReportIndicators, cpcReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchCPCReportList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator
  const { doFetch } = useExport({
    url: `${config.api.baseUrl}/export/pageviews`,
    filters: filtersToAPI,
    fileName: 'cpc_report',
  })

  const toggleDetails = useCallback(() => {
    setCollapsedDetails(!collapsedDetails)
  }, [setCollapsedDetails, collapsedDetails])

  const handleOpenItemDetails = useCallback(
    (cpcReportItem: CPCReportItem) => {
      setSelectedCPCReport(cpcReportItem)
      toggleDetails()
    },
    [toggleDetails, setCollapsedDetails]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.ip'),
        fieldName: 'ip',
        sortable: true,
        dataModifier: (item: CPCReportItem) => item.ip,
      },
      {
        header: t('fields.campaign'),
        fieldName: 'campaign_name',
        sortable: true,
        dataModifier: (item: CPCReportItem) => item.campaignName,
      },
      {
        header: t('fields.url'),
        fieldName: 'url',
        sortable: false,
        dataModifier: (item: CPCReportItem) => (
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
        fieldName: 'created_at',
        sortable: true,
        dataModifier: (data: CPCReportItem) => dateFormat(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t, handleOpenItemDetails]
  )

  const initialIndicators = [
    {
      name: t('indicators.linkout'),
      fieldName: 'linkout',
      value: cpcReportIndicators?.linkout,
    },
    {
      name: t('indicators.coreg'),
      fieldName: 'coreg',
      value: cpcReportIndicators?.coreg,
    },
    {
      name: t('indicators.other'),
      fieldName: 'other',
      value: cpcReportIndicators?.other,
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
  } = useTableSettings(initialColumns, initialIndicators, 'cpcReport')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <CPCReportFilters
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
      <CPCReportTable
        columns={visibleColumns}
        rows={cpcReportItems}
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
      <CPCReportDetails
        open={!collapsedDetails}
        onClose={toggleDetails}
        cpcReport={selectedCPCReport}
      />
    </ContentBox>
  )
}

export default CPCReportList
