import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import DidNumberTable from 'features/Settings/components/DidNumber/DidNumberTable'
import useFilters from 'src/hooks/useFilters'
import useFetchDidNumber from 'features/Settings/hooks/DidNumber/useFetchDidNumberList'
import DidNumberFilters from '../components/DidNumber/DidNumberFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/DidNumber'
import DidNumberEdition from '../components/DidNumber/DidNumberEdition'
import { DidNumberFilter, DidNumberItem } from '../types/DidNumber'
import { Stack } from '@mui/material'
import { EMPTY_DID_NUMBER_FILTERS } from '../schema/DidNumber/DidNumberFilterSchema'

const DidNumber: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.didNumber' })

  const [selectedDidNumber, setSelectedDidNumber] = useState<DidNumberItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<DidNumberFilter>(
    EMPTY_DID_NUMBER_FILTERS,
    transformFiltersToApi
  )

  const { didNumberItems, sorter, setSorter, paginator, loading } = useFetchDidNumber({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const columns = useMemo(
    () => [
      {
        header: t('fields.id'),
        fieldName: 'id',
        sortable: true,
      },
      {
        header: t('fields.description'),
        fieldName: 'description',
        sortable: true,
      },
      {
        header: t('fields.campaign'),
        fieldName: 'campaignName',
        sortable: true,
      },
      {
        header: t('fields.subId'),
        fieldName: 'subId',
        sortable: true,
      },
      {
        header: t('fields.pubId'),
        fieldName: 'pubId',
        sortable: true,
      },
      {
        header: t('fields.trafficSourceId'),
        fieldName: 'trafficSourceId',
        sortable: true,
      },
      {
        header: t('fields.offerId'),
        fieldName: 'offerId',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenDidNumberEdition = useCallback(
    (pubLeads: DidNumberItem) => {
      setSelectedDidNumber(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedDidNumber]
  )

  return (
    <ContentBox>
      <Stack mt={2}>
        <DidNumberFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <DidNumberTable
        columns={columns}
        rows={didNumberItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenDidNumberEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <DidNumberEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        didNumber={selectedDidNumber}
      />
    </ContentBox>
  )
}

export default DidNumber
