import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type PhoneRoomItem, type PhoneRoomsItemFromApi } from '../../types/PhoneRoom'
import { phoneRoomsItemFromApi } from '../../transformers/PhoneRoom'

interface UseFetchPhoneRoomsItemsResponse {
  phoneRoomItems: PhoneRoomItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchPhoneRoomList = ({
  filters,
}: {
  filters: Filters
}): UseFetchPhoneRoomsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [phoneRoomItems, setPhoneRoomsItems] = useState<PhoneRoomItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/settings/phoneroom`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const phoneRoomsItems = response.data.map((item: PhoneRoomsItemFromApi) =>
      phoneRoomsItemFromApi(item)
    )

    setPhoneRoomsItems(phoneRoomsItems)
  }, [response?.data, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        />
      ),
    })
  }, [error, t])

  return {
    phoneRoomItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchPhoneRoomList
