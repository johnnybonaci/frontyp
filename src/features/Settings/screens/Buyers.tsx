import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import BuyersTable from 'features/Settings/components/Buyers/BuyersTable'
import useFilters from 'src/hooks/useFilters'
import useFetchBuyers from 'features/Settings/hooks/Buyers/useFetchBuyersList'
import BuyersFilters from '../components/Buyers/BuyersFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/Buyers'
import BuyersEdition from '../components/Buyers/BuyersEdition'
import { BuyersFilter, BuyersItem } from '../types/Buyers'
import { Stack } from '@mui/material'
import { EMPTY_BUYERS_FILTERS } from '../schema/Buyers/BuyersFilterSchema'

const Buyers: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.buyers' })

  const [selectedBuyers, setSelectedBuyers] = useState<BuyersItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<BuyersFilter>(
    transformFiltersToApi,
    undefined,
    undefined,
    EMPTY_BUYERS_FILTERS
  )

  const { buyersItems, sorter, setSorter, paginator, loading } = useFetchBuyers({
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
        header: t('fields.buyerProviderId'),
        fieldName: 'buyerProviderId',
        sortable: true,
      },
      {
        header: t('fields.providerName'),
        fieldName: 'providerId',
        sortable: true,
      },
      {
        header: t('fields.userName'),
        fieldName: 'userId',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenBuyersEdition = useCallback(
    (pubLeads: BuyersItem) => {
      setSelectedBuyers(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedBuyers]
  )

  return (
    <ContentBox>
      <Stack mt={2}>
        <BuyersFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <BuyersTable
        columns={columns}
        rows={buyersItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenBuyersEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <BuyersEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        buyers={selectedBuyers}
      />
    </ContentBox>
  )
}

export default Buyers
