import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import LeadReportTable from 'features/LeadReport/components/LeadReportTable/LeadReportTable.tsx'
import useFilters from 'src/hooks/useFilters'
import useFetchLeadReportList from 'features/LeadReport/hooks/useFetchLeadReportList.tsx'
import styles from './leadReportList.module.scss'
import Indicator from 'components/Indicator/Indicator.tsx'
import ContentBox from 'components/ContentBox'
import { type LeadReportItem } from 'features/LeadReport/types'
import PrivateScreenTitle from 'components/PrivateScreenTitle'

import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/LeadReport/transformers'
import RefreshButton from 'components/RefreshButton'

import LeadReportFilters, {
  type LeadReportListFiltersFormValues,
  DEFAULT_FILTERS,
} from '../components/LeadReportFilters/LeadReportFilters.tsx'
import LeadType from 'components/LeadType'

const LeadReportList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'LeadReport' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters<LeadReportListFiltersFormValues>(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { leadReportItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchLeadReportList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator


  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.pubId'),
        fieldName: 'pub_id',
        sortable: true,
        dataModifier: (item: LeadReportItem) => item.pubId,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: true,
        dataModifier: (item: LeadReportItem) => <LeadType type={item.type} />,
      },
      {
        header: t('fields.leads'),
        fieldName: 'leads',
        sortable: true,
        dataModifier: (item: LeadReportItem) => item.leads,
      },
      {
        header: t('fields.leadsDup'),
        fieldName: 'leads_dup',
        sortable: true,
        dataModifier: (item: LeadReportItem) => item.leadsDup,
      },
      {
        header: t('fields.uniqueLeads'),
        fieldName: 'unique_leads',
        sortable: true,
        dataModifier: (item: LeadReportItem) => item.uniqueLeads,
      },
      {
        header: t('fields.totalLeads'),
        fieldName: 'total_leads',
        sortable: true,
        dataModifier: (item: LeadReportItem) => item.totalLeads,
      },
      {
        header: t('fields.dateHistory'),
        fieldName: 'date_history',
        sortable: false,
        dataModifier: (item: LeadReportItem) => item.dateHistory,
      }

    ],
    [t]
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
  } = useTableSettings(initialColumns, [], 'leadReportList')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <LeadReportFilters
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
      <LeadReportTable
        columns={visibleColumns}
        rows={leadReportItems}
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

export default LeadReportList
