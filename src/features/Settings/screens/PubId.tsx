import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PubIdTable from 'features/Settings/components/PubId/PubIdTable/PubIdTable'
import useFilters from 'src/hooks/useFilters'
import useFetchPubIdList from 'features/Settings/hooks/PubId/useFetchPubIdList'
import PubIdFilters from '../components/PubId/PubIdFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/PubId'
import PubIdForm from '../components/PubId/PubIdForm'
import { PubIdItem, PubIdListFiltersFormValues, PubIdOfferType } from '../types/PubId'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { EMPTY_PUBID_FILTERS } from '../schema/PubId/PubIdFiltersSchema'
import { TableColumn } from 'components/Table'
import { EditOutlined } from '@mui/icons-material'
import PubIdOfferEdition from '../components/PubId/PubIdOfferEdition'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const PubIdList: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })

  const [selectedPubId, setSelectedPubId] = useState<PubIdItem | null>(null)
  const [selectedOfferType, setSelectedOffselectedOfferType] = useState<PubIdOfferType>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)
  const [collapsedOfferEdition, setCollapsedOfferEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<PubIdListFiltersFormValues>(
    EMPTY_PUBID_FILTERS,
    transformFiltersToApi
  )

  const { pubIdItems, sorter, setSorter, paginator, loading, refresh } = useFetchPubIdList({
    filters: filtersToAPI,
  })

  const { lastPage, displayResultsMessage, page, setPage, perPage, setPerPage } = paginator

  const openOfferEdition = useCallback((pubIdItem: PubIdItem, type: PubIdOfferType = 'ACA') => {
    setCollapsedOfferEdition(false)
    setSelectedOffselectedOfferType(type)
    setSelectedPubId(pubIdItem)
  }, [])

  const closeOfferEdition = useCallback(() => {
    setCollapsedOfferEdition(true)
  }, [])

  const columns = useMemo(
    (): TableColumn[] => [
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
      {
        header: t('fields.ACA'),
        dataModifier: (pubIdItem: PubIdItem) => (
          <IconButton color="primary" onClick={() => openOfferEdition(pubIdItem, 'ACA')}>
            <Tooltip title={t('edition.ACA')}>
              <EditOutlined />
            </Tooltip>
          </IconButton>
        ),
      },
      {
        header: t('fields.MC'),
        dataModifier: (pubIdItem: PubIdItem) => (
          <IconButton color="primary" onClick={() => openOfferEdition(pubIdItem, 'MC')}>
            <Tooltip title={t('edition.MC')}>
              <EditOutlined />
            </Tooltip>
          </IconButton>
        ),
      },
    ],
    [t]
  )

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenPubIdForm = useCallback(
    (pubIdItem: PubIdItem) => {
      setSelectedPubId(pubIdItem)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedPubId]
  )

  const onEditSuccess = useCallback(() => {
    refresh()
    toggleViewDetails()
  }, [refresh, toggleViewDetails])

  return (
    <ContentBox>
      <Stack mt={2} direction="row" justifyContent="end">
        <IconButton
          onClick={() => {
            setSelectedPubId(null)
            toggleViewDetails()
          }}
          color="primary"
          size="large"
        >
          <Tooltip title={t('creation.label')}>
            <AddCircleOutlineIcon />
          </Tooltip>
        </IconButton>
        <PubIdFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <PubIdTable
        columns={columns}
        rows={pubIdItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenPubIdForm}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <PubIdForm
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        onEditSuccess={onEditSuccess}
        pub={selectedPubId}
      />
      <PubIdOfferEdition
        open={!collapsedOfferEdition}
        onClose={closeOfferEdition}
        onEditSuccess={onEditSuccess}
        pub={selectedPubId!}
        type={selectedOfferType}
      />
    </ContentBox>
  )
}

export default PubIdList
