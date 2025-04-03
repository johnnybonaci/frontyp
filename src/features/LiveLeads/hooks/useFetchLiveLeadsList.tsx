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
  type LiveLeadsAverages,
  type LiveLeadsItem,
  type LiveLeadsItemFromApi,
  type LiveLeadsPercentages,
} from 'features/LiveLeads/types'
import {
  liveLeadsAveragesFromApi,
  liveLeadsItemFromApi,
  liveLeadsPercentagesFromApi,
} from 'features/LiveLeads/transformers'

interface UseFetchLiveLeadsItemsResponse {
  liveLeadsItems: LiveLeadsItem[] | null
  liveLeadsAverages: LiveLeadsAverages | null
  liveLeadsPercentages: LiveLeadsPercentages | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchLiveLeadsList = ({
  filters,
}: {
  filters: Filters
}): UseFetchLiveLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [liveLeadsItems, setLiveLeadsItems] = useState<LiveLeadsItem[] | null>(null)
  const [liveLeadsAverages, setLiveLeadsAverages] = useState<LiveLeadsAverages | null>(null)
  const [liveLeadsPercentages, setLiveLeadsPercentages] = useState<LiveLeadsPercentages | null>(
    null
  )

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/leads`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const liveLeadsItems = response.data.map((role: LiveLeadsItemFromApi) =>
      liveLeadsItemFromApi(role)
    )

    setLiveLeadsAverages(liveLeadsAveragesFromApi(response.average))
    setLiveLeadsPercentages(liveLeadsPercentagesFromApi(response.totals_diff))
    setLiveLeadsItems(liveLeadsItems)
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
    liveLeadsItems,
    liveLeadsAverages,
    liveLeadsPercentages,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchLiveLeadsList
