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
  callCampaignIndicatorsFromApi,
  callCampaignItemFromApi,
} from 'features/CallCampaigns/transformers'
import { type CallCampaignIndicators, type CallCampaignItem } from 'features/CallCampaigns/types'

interface UseFetchCallCampaignItemsResponse {
  callCampaignItems: CallCampaignItem[] | null
  callCampaignIndicators: CallCampaignIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchCallCampaignList = ({
  filters,
}: {
  filters: Filters
}): UseFetchCallCampaignItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [callCampaignItems, setCallCampaignItems] = useState<CallCampaignItem[] | null>(null)
  const [callCampaignIndicators, setCallCampaignIndicators] =
    useState<CallCampaignIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/campaign`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const callCampaignItems = response.data.map(callCampaignItemFromApi)

    setCallCampaignIndicators(callCampaignIndicatorsFromApi(response.average))
    setCallCampaignItems(callCampaignItems)
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
    callCampaignItems,
    callCampaignIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchCallCampaignList
