import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import OffersTable from 'features/Settings/components/Offers/OffersTable'
import useFilters from 'src/hooks/useFilters'
import useFetchOffers from 'features/Settings/hooks/Offers/useFetchOffersList'
import OffersFilters from '../components/Offers/OffersFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/Offers'
import OffersEdition from '../components/Offers/OffersEdition'
import { OffersFilter, OffersItem } from '../types/Offers'
import { Stack } from '@mui/material'
import { EMPTY_OFFERS_FILTERS } from '../schema/Offers/OffersFiltersSchema'

const Offers: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.offers' })

  const [selectedOffers, setSelectedOffers] = useState<OffersItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<OffersFilter>(
    EMPTY_OFFERS_FILTERS,
    transformFiltersToApi
  )

  const { offersItems, sorter, setSorter, paginator, loading } = useFetchOffers({
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
        header: t('fields.type'),
        fieldName: 'type',
        sortName: 'type',
        sortable: true,
      },
      {
        header: t('fields.sourceUrl'),
        fieldName: 'sourceUrl',
        sortName: 'source_url',
        sortable: true,
      },
      {
        header: t('fields.providerName'),
        sortName: 'provider_id',
        sortable: true,
        dataModifier: (item: OffersItem) => `${item.provider?.title} (${item.provider?.id})`,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenOffersEdition = useCallback(
    (pubLeads: OffersItem) => {
      setSelectedOffers(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedOffers]
  )

  return (
    <ContentBox>
      <Stack mt={2}>
        <OffersFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <OffersTable
        columns={columns}
        rows={offersItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenOffersEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <OffersEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        offers={selectedOffers}
      />
    </ContentBox>
  )
}

export default Offers
