import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PubIdTable from 'features/Settings/components/PubIdTable/PubIdTable'
import useFilters from 'src/hooks/useFilters'
import useFetchPubIdList from 'features/Settings/hooks/useFetchPubIdList'
import PubIdFilters from '../components/PubIdFilters'
import ContentBox from 'components/ContentBox'
import {
  transformFiltersFromUrl,
  transformFiltersToApi,
  transformFiltersToUrl,
} from 'features/Settings/transformers'
import PubIdEdition from '../components/PubIdEdition'
import { PubIdItem } from '../types'
import { Stack } from '@mui/material'

const PubIdList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })

  const [selectedPubId, setSelectedPubId] = useState<PubIdItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, initialFilters, onCancel, onApply } = useFilters(
    transformFiltersToApi,
    transformFiltersFromUrl,
    transformFiltersToUrl
  )

  const { pubIdItems, sorter, setSorter, paginator, loading } = useFetchPubIdList({ filters })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const columns = useMemo(
    () => [
      {
        header: t('fields.pubs'),
        fieldName: 'id',
        sortable: true,
      },
      {
        header: t('fields.name'),
        fieldName: 'name',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenPubIdEdition = useCallback(
    (pubLeads: PubIdItem) => {
      setSelectedPubId(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedPubId]
  )

  console.log(initialFilters)

  return (
    <ContentBox>
      <Stack mt={2}>
        <PubIdFilters initialFilters={initialFilters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <PubIdTable
        columns={columns}
        rows={pubIdItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenPubIdEdition}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <PubIdEdition open={!collapsedViewEdition} onClose={toggleViewDetails} pub={selectedPubId} />
    </ContentBox>
  )
}

export default PubIdList
