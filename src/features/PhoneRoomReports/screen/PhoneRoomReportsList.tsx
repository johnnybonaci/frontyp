import { useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import ContentBox from 'components/ContentBox'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import useTableSettings from 'hooks/useTableSettings.tsx'
import ListSettings from 'components/ListSettings'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/PhoneRoomReports/transformers'
import RefreshButton from 'components/RefreshButton'
import { type PhoneRoomReportsItem } from 'features/PhoneRoomReports/types'
import styles from './phoneRoomReportsList.module.scss'
import useFetchPhoneRoomReportsList from 'features/PhoneRoomReports/hooks/useFetchPhoneRoomReportsList.tsx'
import PhoneRoomReportsFilters, {
  DEFAULT_FILTERS,
} from '../components/PhoneRoomReportsFilters/PhoneRoomReportsFilters.tsx'
import dateFormat from 'utils/dateFormat.ts'
import PhoneRoomReportsTable from 'features/PhoneRoomReports/components/PhoneRoomReportsTable'
import LeadType from 'components/LeadType'
import PhoneRoomReportsUpdated from 'components/PhoneRoomReportsUpdated/PhoneRoomReportsUpdated.tsx'

const PhoneRoomReportsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomReports' })

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { phoneRoomReportsItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchPhoneRoomReportsList({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.phone'),
        fieldName: 'phone',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.phone,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => <LeadType type={item.type} />,
      },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.firstName,
      },
      {
        header: t('fields.lastName'),
        fieldName: 'last_name',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.lastName,
      },
      {
        header: t('fields.pubListId'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.pubListId,
      },
      {
        header: t('fields.vendorsYp'),
        fieldName: 'vendors_yp',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.vendorsYp,
      },
      {
        header: t('fields.subId'),
        fieldName: 'sub_id',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.subId,
      },
      {
        header: t('fields.callCount'),
        fieldName: 'call_count',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.callCount,
      },
      {
        header: t('fields.code'),
        fieldName: 'code',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.code,
      },
      {
        header: t('fields.description'),
        fieldName: 'description',
        sortable: true,
        dataModifier: (item: PhoneRoomReportsItem) => item.description,
      },
      {
        header: t('fields.createdAt'),
        fieldName: 'created_at',
        sortable: true,
        dataModifier: (data: PhoneRoomReportsItem) =>
          dateFormat(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        header: t('fields.created'),
        fieldName: 'created',
        sortable: true,
        dataModifier: (data: PhoneRoomReportsItem) =>
          dateFormat(data.created, 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        header: t('fields.updated'),
        fieldName: 'updated',
        sortable: true,
        dataModifier: (data: PhoneRoomReportsItem) => (
          <PhoneRoomReportsUpdated created={data.created} updated={data.updated} />
        ),
      },
    ],
    [t]
  )

  const {
    columns,
    indicators,
    notVisibleColumns,
    notVisibleIndicators,
    reorderColumns,
    resetToDefaultSettings,
    visibleColumns,
    reorderIndicators,
    toggleColumnVisibility,
    toggleIndicatorVisibility,
  } = useTableSettings(initialColumns, [], 'phoneRoomReports')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <PhoneRoomReportsFilters
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
      <PhoneRoomReportsTable
        columns={visibleColumns}
        rows={phoneRoomReportsItems}
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

export default PhoneRoomReportsList
