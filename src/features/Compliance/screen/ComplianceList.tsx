import { useMemo, type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ComplianceTable from 'features/Compliance/components/ComplianceTable/ComplianceTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchComplianceList from 'features/Compliance/hooks/useFetchComplianceList.tsx'
import styles from './complianceList.module.scss'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type ComplianceItem } from 'features/Compliance/types'
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
} from 'features/Compliance/transformers'
import dateFormat from 'utils/dateFormat.ts'
import RefreshButton from 'components/RefreshButton'
import { type CallReportItem } from 'features/CallReport/types'
import { VisibilityOutlined } from '@mui/icons-material'
import ComplianceFilters, {
  type ComplianceListFiltersFormValues,
  DEFAULT_FILTERS,
} from '../components/ComplianceFilters/ComplianceFilters.tsx'
import LeadType from 'components/LeadType'

const ComplianceList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Compliance' })
  const [selectedCompliance, setSelectedCompliance] = useState<ComplianceItem | undefined>(
    undefined
  )

  const [collapsedViewDetails, setCollapsedViewDetails] = useState(true)

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewDetails(!collapsedViewDetails)
  }, [setCollapsedViewDetails, collapsedViewDetails])

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<ComplianceListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { complianceItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchComplianceList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const handleOpenComplianceDetails = useCallback(
    (complianceItem: ComplianceItem) => {
      setSelectedCompliance(complianceItem)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedCompliance]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.email,
      },
      {
        header: t('fields.phone'),
        fieldName: 'phone_id',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.phone,
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.pubListId,
      },
      {
        header: t('fields.vendor'),
        fieldName: 'vendors_yp',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.vendorsYp,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: true,
        dataModifier: (item: ComplianceItem) => <LeadType type={item.type} />,
      },
      {
        header: t('fields.subId'),
        fieldName: 'sub_id',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.subId,
      },
      {
        header: t('fields.universalLeadId'),
        fieldName: 'universal_lead_id',
        sortable: true,
        dataModifier: (item: ComplianceItem) => item.universalLeadId,
      },
      {
        header: t('fields.trust'),
        fieldName: 'trust',
        sortable: false,
        dataModifier: (item: ComplianceItem) => (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenComplianceDetails(item)
            }}
          >
            <Tooltip title={t('details.title')}>
              <VisibilityOutlined sx={{ fontSize: 14 }} />
            </Tooltip>
          </IconButton>
        ),
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
  } = useTableSettings(initialColumns, [], 'complianceList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <ComplianceFilters
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
      <ComplianceTable
        columns={visibleColumns}
        rows={complianceItems}
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
      <Drawer open={!collapsedViewDetails} onClose={toggleViewDetails} anchor="right">
        <DrawerHeader title={t('details.title')} onClose={toggleViewDetails} />
        <DrawerContent>
          <div className={styles.detailsContainer}>
            <div className={styles.item}>
              <div className={styles.itemLabel}>{t('details.trustedForm')}</div>
              <div className={styles.itemValue}>{selectedCompliance?.trustedForm}</div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </ContentBox>
  )
}

export default ComplianceList
