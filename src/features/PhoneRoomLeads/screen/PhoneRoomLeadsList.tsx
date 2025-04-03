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
} from 'features/PhoneRoomLeads/transformers'
import RefreshButton from 'components/RefreshButton'
import { type PhoneRoomLeadsItem } from 'features/PhoneRoomLeads/types'
import styles from './phoneRoomLeads.module.scss'
import useFetchPhoneRoomLeadsList from 'features/PhoneRoomLeads/hooks/useFetchPhoneRoomLeadsList.tsx'
import PhoneRoomLeadsFilters, {
  DEFAULT_FILTERS,
} from '../components/PhoneRoomLeadsFilters/PhoneRoomLeadsFilters.tsx'
import dateFormat from 'utils/dateFormat.ts'
import PhoneRoomLeadsTable from 'features/PhoneRoomLeads/components/PhoneRoomLeadsTable'
import PhoneRoomLeadsDetails from 'src/features/PhoneRoomLeads/components/PhoneRoomLeadsDetails'
import { IconButton, Tooltip } from '@mui/material'
import { VisibilityOutlined } from '@mui/icons-material'
import LeadType from 'components/LeadType'
import PhoneRoomLeadStatus from 'components/PhoneRoomLeadStatus'

const PhoneRoomLeadsList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomLeads' })

  const [collapsedDetails, setCollapsedDetails] = useState(true)
  const [selectedPhoneRoomLeads, setSelectedPhoneRoomLeads] = useState<PhoneRoomLeadsItem>()

  const { onCancel, onApply, filters, filtersToAPI } = useFilters(
    DEFAULT_FILTERS,
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const {
    phoneRoomLeadsIndicators,
    phoneRoomLeadsItems,
    sorter,
    setSorter,
    paginator,
    loading,
    refresh,
  } = useFetchPhoneRoomLeadsList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const toggleDetails = useCallback(() => {
    setCollapsedDetails(!collapsedDetails)
  }, [setCollapsedDetails, collapsedDetails])

  const handleOpenItemDetails = useCallback(
    (cpcReportItem: PhoneRoomLeadsItem) => {
      setSelectedPhoneRoomLeads(cpcReportItem)
      toggleDetails()
    },
    [toggleDetails, setCollapsedDetails]
  )

  const initialColumns = useMemo(
    () => [
      {
        header: t('fields.phone'),
        fieldName: 'phone',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.phone,
      },
      {
        header: t('fields.pubs'),
        fieldName: 'pub_list_id',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.pubListId,
      },
      {
        header: t('fields.subId'),
        fieldName: 'sub_id',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.subId,
      },
      {
        header: t('fields.vendor'),
        fieldName: 'vendors_yp',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.vendorsYp,
      },
      {
        header: t('fields.type'),
        fieldName: 'type',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => <LeadType type={item.type} />,
      },
      {
        header: t('fields.firstName'),
        fieldName: 'first_name',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.firstName,
      },
      {
        header: t('fields.email'),
        fieldName: 'email',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => item.email,
      },
      {
        header: t('fields.status'),
        fieldName: 'status',
        sortable: true,
        dataModifier: (item: PhoneRoomLeadsItem) => <PhoneRoomLeadStatus status={item.status} />,
      },
      {
        header: t('fields.dataLog'),
        fieldName: 'data_log',
        sortable: false,
        dataModifier: (item: PhoneRoomLeadsItem) => (
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
        dataModifier: (data: PhoneRoomLeadsItem) =>
          dateFormat(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
      },
    ],
    [t, handleOpenItemDetails]
  )

  const initialIndicators = [
    {
      name: t('indicators.totalLeads'),
      fieldName: 'totalLeads',
      value: phoneRoomLeadsIndicators?.total,
    },
    {
      name: t('indicators.totalSent'),
      fieldName: 'totalSent',
      value: phoneRoomLeadsIndicators?.sent,
    },
    {
      name: t('indicators.success'),
      fieldName: 'success',
      value: phoneRoomLeadsIndicators?.success,
    },
    {
      name: t('indicators.rejected'),
      fieldName: 'rejected',
      value: phoneRoomLeadsIndicators?.rejected,
    },
    {
      name: t('indicators.totalQueued'),
      fieldName: 'totalQueued',
      value: phoneRoomLeadsIndicators?.noSent,
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
  } = useTableSettings(initialColumns, initialIndicators, 'phoneRoomLeads')

  return (
    <ContentBox>
      <PrivateScreenTitle title={t('listing.title')} />
      <div className={styles.actions}>
        <RefreshButton onRefresh={refresh} />
        <PhoneRoomLeadsFilters
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
      <PhoneRoomLeadsTable
        columns={visibleColumns}
        rows={phoneRoomLeadsItems}
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
      <PhoneRoomLeadsDetails
        open={!collapsedDetails}
        onClose={toggleDetails}
        phoneRoomLeadsItem={selectedPhoneRoomLeads}
      />
    </ContentBox>
  )
}

export default PhoneRoomLeadsList
