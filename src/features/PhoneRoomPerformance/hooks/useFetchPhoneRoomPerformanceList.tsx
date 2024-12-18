import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { phoneRoomPerformanceItemFromApi } from 'features/PhoneRoomPerformance/transformers'
import { type PhoneRoomPerformanceItem } from 'features/PhoneRoomPerformance/types'

interface UseFetchPhoneRoomPerformanceItemsResponse {
  phoneRoomPerformanceItems: PhoneRoomPerformanceItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchPhoneRoomPerformanceList = ({
  filters,
}: {
  filters: Filters
}): UseFetchPhoneRoomPerformanceItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [phoneRoomPerformanceItems, setPhoneRoomPerformanceItems] = useState<
    PhoneRoomPerformanceItem[] | null
  >(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/metricsphoneroom`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const phoneRoomPerformanceItems = response.data.map(phoneRoomPerformanceItemFromApi)

    setPhoneRoomPerformanceItems(phoneRoomPerformanceItems)
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
    phoneRoomPerformanceItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchPhoneRoomPerformanceList
