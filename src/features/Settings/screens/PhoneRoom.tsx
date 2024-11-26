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

const PhoneRoom: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom' })

  const [selectedPhoneRoom, setSelectedPhoneRoom] = useState<PhoneRoomItem>()
  const [collapsedViewEdition, setCollapsedViewEdition] = useState(true)

  const { filters, filtersToAPI, onCancel, onApply } = useFilters<PhoneRoomFilter>(
    EMPTY_PHONE_ROOM_FILTERS,
    transformFiltersToApi
  )

  const { phoneRoomItems, sorter, setSorter, paginator, loading } = useFetchPhoneRoom({
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

  const toggleViewDetails = useCallback(() => {
    setCollapsedViewEdition(!collapsedViewEdition)
  }, [setCollapsedViewEdition, collapsedViewEdition])

  const handleOpenPhoneRoomEdition = useCallback(
    (pubLeads: PhoneRoomItem) => {
      setSelectedPhoneRoom(pubLeads)
      toggleViewDetails()
    },
    [toggleViewDetails, setSelectedPhoneRoom]
  )

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
        count={lastPage}
        page={page}
        onPageChange={setPage}
        displayResultsMessage={displayResultsMessage}
      />
      <PhoneRoomEdition
        open={!collapsedViewEdition}
        onClose={toggleViewDetails}
        phoneRoom={selectedPhoneRoom}
      />
    </ContentBox>
  )
}

export default PhoneRoom
