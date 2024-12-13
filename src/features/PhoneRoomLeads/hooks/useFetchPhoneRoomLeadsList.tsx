import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import {
  phoneRoomLeadsIndicatorsFromApi,
  phoneRoomLeadsItemFromApi,
} from 'features/PhoneRoomLeads/transformers'
import {
  type PhoneRoomLeadsIndicators,
  type PhoneRoomLeadsItem,
} from 'features/PhoneRoomLeads/types'

interface UseFetchPhoneRoomLeadsItemsResponse {
  phoneRoomLeadsItems: PhoneRoomLeadsItem[] | null
  phoneRoomLeadsIndicators: PhoneRoomLeadsIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchPhoneRoomLeadsList = ({
  filters,
}: {
  filters: Filters
}): UseFetchPhoneRoomLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [phoneRoomLeadsItems, setPhoneRoomLeadsItems] = useState<PhoneRoomLeadsItem[] | null>(null)
  const [phoneRoomLeadsIndicators, setPhoneRoomLeadsIndicators] =
    useState<PhoneRoomLeadsIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/phoneroom`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const phoneRoomLeadsItems = response.data.map(phoneRoomLeadsItemFromApi)

    setPhoneRoomLeadsIndicators(phoneRoomLeadsIndicatorsFromApi(response.average))
    setPhoneRoomLeadsItems(phoneRoomLeadsItems)
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
    phoneRoomLeadsItems,
    phoneRoomLeadsIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchPhoneRoomLeadsList
