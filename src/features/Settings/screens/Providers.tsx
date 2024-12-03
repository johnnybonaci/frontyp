import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import ProvidersTable from 'features/Settings/components/Providers/ProvidersTable'
import useFilters from 'src/hooks/useFilters'
import useFetchProviders from 'features/Settings/hooks/Providers/useFetchProvidersList'
import ProvidersFilters from '../components/Providers/ProvidersFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/Providers'
import ProvidersEdition from '../components/Providers/ProvidersEdition'
import { ProvidersFilter, ProvidersItem } from '../types/Providers'
import { Stack } from '@mui/material'
import { EMPTY_PROVIDERS_FILTERS } from '../schema/Providers/ProvidersFilterSchema'

const Providers: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.providers' })

  const [selectedProviders, setSelectedProviders] = useState<ProvidersItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<ProvidersFilter>(
    EMPTY_PROVIDERS_FILTERS,
    transformFiltersToApi
  )

  const { providersItems, sorter, setSorter, paginator, loading } = useFetchProviders({
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
        header: t('fields.service'),
        fieldName: 'service',
        sortable: true,
      },
      {
        header: t('fields.url'),
        fieldName: 'url',
        sortable: true,
      },
      {
        header: t('fields.active'),
        fieldName: 'active',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenProvidersEdition = useCallback(
    (pubLeads: ProvidersItem) => {
      setSelectedProviders(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedProviders]
  )

  return (
    <ContentBox>
      <Stack mt={2}>
        <ProvidersFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <ProvidersTable
        columns={columns}
        rows={providersItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenProvidersEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <ProvidersEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        providers={selectedProviders}
      />
    </ContentBox>
  )
}

export default Providers
