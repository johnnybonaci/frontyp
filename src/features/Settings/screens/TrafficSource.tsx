import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import TrafficSourceTable from 'features/Settings/components/TrafficSource/TrafficSourceTable/TrafficSourceTable'
import useFilters from 'src/hooks/useFilters'
import useFetchTrafficSource from 'features/Settings/hooks/TrafficSource/useFetchTrafficSourceList'
import TrafficSourceFilters from '../components/TrafficSource/TrafficSourceFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/TrafficSource'
import TrafficSourceEdition from '../components/TrafficSource/TrafficSourceEdition'
import { TrafficSourceFilter, TrafficSourceItem } from '../types/TrafficSource'
import { Stack } from '@mui/material'
import { EMPTY_TRAFFIC_SOURCE_FILTERS } from '../schema/TrafficSource/TrafficSourceFiltersSchema'

const TrafficSource: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.trafficSource' })

  const [selectedTrafficSource, setSelectedTrafficSource] = useState<TrafficSourceItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<TrafficSourceFilter>(
    EMPTY_TRAFFIC_SOURCE_FILTERS,
    transformFiltersToApi
  )

  const { trafficSourceItems, sorter, setSorter, paginator, loading, refresh } =
    useFetchTrafficSource({
      filters: filtersToAPI,
    })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const columns = useMemo(
    () => [
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
      {
        header: t('fields.trafficSourceProviderId'),
        fieldName: 'trafficSourceProviderId',
        sortName: 'traffic_source_provider_id',
        sortable: true,
      },
      {
        header: t('fields.providerName'),
        sortName: 'provider_id',
        sortable: true,
        dataModifier: (item: TrafficSourceItem) => `${item.provider.name} (${item.provider.id})`,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenTrafficSourceEdition = useCallback(
    (pubLeads: TrafficSourceItem) => {
      setSelectedTrafficSource(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedTrafficSource]
  )

  const onEditSuccess = useCallback(() => {
    refresh()
    toggleViewDetails()
  }, [refresh, toggleViewDetails])

  return (
    <ContentBox>
      <Stack mt={2}>
        <TrafficSourceFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <TrafficSourceTable
        columns={columns}
        rows={trafficSourceItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenTrafficSourceEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <TrafficSourceEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        onEditSuccess={onEditSuccess}
        trafficSource={selectedTrafficSource}
      />
    </ContentBox>
  )
}

export default TrafficSource
