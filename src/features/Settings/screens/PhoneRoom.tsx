import { useCallback, useMemo, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PhoneRoomTable from 'features/Settings/components/PhoneRoom/PhoneRoomTable/PhoneRoomTable'
import useFilters from 'src/hooks/useFilters'
import useFetchPhoneRoom from 'features/Settings/hooks/PhoneRoom/useFetchPhoneRoomList'
import PhoneRoomFilters from '../components/PhoneRoom/PhoneRoomFilters'
import ContentBox from 'components/ContentBox'
import { transformFiltersToApi } from 'features/Settings/transformers/PhoneRoom'
import PhoneRoomEdition from '../components/PhoneRoom/PhoneRoomEdition'
import { PhoneRoomFilter, PhoneRoomItem } from '../types/PhoneRoom'
import { Stack } from '@mui/material'
import { EMPTY_PHONE_ROOM_FILTERS } from '../schema/PhoneRoom/PhoneRoomFiltersSchema'
import PhoneRoomConfigDetails from '../components/PhoneRoom/PhoneRoomConfigDetails'

const PhoneRoom: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom' })

  const [selectedPhoneRoom, setSelectedPhoneRoom] = useState<PhoneRoomItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)
  const [collapsedConfigViewDetails, setCollapsedConfigViewDetails] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<PhoneRoomFilter>(
    EMPTY_PHONE_ROOM_FILTERS,
    transformFiltersToApi
  )

  const { phoneRoomItems, sorter, setSorter, paginator, loading, refresh } = useFetchPhoneRoom({
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
        header: t('fields.active'),
        fieldName: 'active',
        sortable: true,
      },
    ],
    [t]
  )

  const toggleViewEdition = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const toggleConfigViewDetails = useCallback(() => {
    setCollapsedConfigViewDetails(!collapsedConfigViewDetails)
  }, [setCollapsedConfigViewDetails, collapsedConfigViewDetails])

  const handleOpenPhoneRoomEdition = useCallback(
    (phoneRoom: PhoneRoomItem) => {
      setSelectedPhoneRoom(phoneRoom)
      toggleViewEdition()
    },
    [toggleViewEdition, setSelectedPhoneRoom]
  )

  const handleOpenPhoneRoomConfigDetails = useCallback(
    (phoneRoom: PhoneRoomItem) => {
      setSelectedPhoneRoom(phoneRoom)
      toggleConfigViewDetails()
    },
    [toggleViewEdition, setSelectedPhoneRoom]
  )

  const onEditSuccess = useCallback(() => {
    refresh()
    toggleViewEdition()
  }, [refresh, toggleViewEdition])

  return (
    <ContentBox>
      <Stack mt={2}>
        <PhoneRoomFilters initialFilters={filters} onCancel={onCancel} onApply={onApply} />
      </Stack>
      <PhoneRoomTable
        columns={columns}
        rows={phoneRoomItems}
        loading={loading}
        sorter={sorter}
        onSort={setSorter}
        perPage={perPage}
        onRowsPerPageChange={setPerPage}
        onClickEdit={handleOpenPhoneRoomEdition}
        onClickViewConfig={handleOpenPhoneRoomConfigDetails}
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <PhoneRoomEdition
        open={!collapsedViewEdition}
        onClose={toggleViewEdition}
        phoneRoom={selectedPhoneRoom}
        onEditSuccess={onEditSuccess}
      />
      <PhoneRoomConfigDetails
        open={!collapsedConfigViewDetails}
        onClose={toggleConfigViewDetails}
        phoneRoom={selectedPhoneRoom}
      />
    </ContentBox>
  )
}

export default PhoneRoom
