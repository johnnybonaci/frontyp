import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { phoneRoomReportsItemFromApi } from 'features/PhoneRoomReports/transformers'
import { type PhoneRoomReportsItem } from 'features/PhoneRoomReports/types'

interface UseFetchPhoneRoomReportsItemsResponse {
  phoneRoomReportsItems: PhoneRoomReportsItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchPhoneRoomReportsList = ({
  filters,
}: {
  filters: Filters
}): UseFetchPhoneRoomReportsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [phoneRoomReportsItems, setPhoneRoomReportsItems] = useState<PhoneRoomReportsItem[] | null>(
    null
  )
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/reportsphoneroom`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const phoneRoomReportsItems = response.data.map(phoneRoomReportsItemFromApi)

    setPhoneRoomReportsItems(phoneRoomReportsItems)
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
    phoneRoomReportsItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchPhoneRoomReportsList
