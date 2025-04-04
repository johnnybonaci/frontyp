import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReportLeadsTable from 'features/ReportLeads/components/ReportLeadsTable/ReportLeadsTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchReportLeadsList from 'features/ReportLeads/hooks/useFetchReportLeadsList.tsx'
import ReportLeadsFilters from '../components/ReportLeadsFilters/index.ts'
import styles from './reportLeadsList.module.scss'

import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type ReportLeadsItem } from 'features/ReportLeads/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings, {
  type DoubleIndicatorSettings,
  type IndicatorSettings,
} from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersToApi,
  transformFiltersFromUrl,
  transformFiltersToUrl,
} from 'features/ReportLeads/transformers'
import RefreshButton from 'components/RefreshButton'
import {
  DEFAULT_FILTERS,
  type ReportLeadsListFiltersFormValues,
} from '../components/ReportLeadsFilters/ReportLeadsFilters.tsx'
import LeadType from 'components/LeadType'

const ReportLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'ReportLeads' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<ReportLeadsListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const {
    reportLeadsItems,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchReportLeadsList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.pubId'),
        fieldName: 'pub_id',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => item.pubId,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => <LeadType type={item.type} />,
      },
      {
        header: t('fields.leads'),
        fieldName: 'leads',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => item.leads,
      },
      {
        header: t('fields.leadsDup'),
        fieldName: 'leads_dup',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => item.leadsDup,
      },
      {
        header: t('fields.uniqueLeads'),
        fieldName: 'unique_leads',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => item.uniqueLeads,
      },
      {
        header: t('fields.totalLeads'),
        fieldName: 'total_leads',
        sortable: true,
        dataModifier: (item: ReportLeadsItem) => item.totalLeads,
      },
      {
        header: t('fields.dateHistory'),
        fieldName: 'date_history',
        sortable: false,
        dataModifier: (item: ReportLeadsItem) => item.dateHistory,
      }
    ],
    [t, filters?.startDate, filters?.endDate]
  )

  const initialIndicators: Array<IndicatorSettings | DoubleIndicatorSettings> = []

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
  } = useTableSettings(initialColumns, initialIndicators, 'reportLeadsList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <ReportLeadsFilters
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
      </div>
      <div className={styles.kpis}>
        {visibleIndicators.map((ind) => (
          <Indicator key={ind.name} indicator={ind} loading={loading} />
        ))}
      </div>
      <ReportLeadsTable
        columns={visibleColumns}
        rows={reportLeadsItems}
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

export default ReportLeadsList
