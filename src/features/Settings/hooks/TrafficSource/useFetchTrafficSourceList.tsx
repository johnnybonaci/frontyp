import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type TrafficSourceItem, type TrafficSourcesItemFromApi } from '../../types/TrafficSource'
import { trafficSourcesItemFromApi } from '../../transformers/TrafficSource'

interface UseFetchTrafficSourcesItemsResponse {
  trafficSourceItems: TrafficSourceItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchTrafficSourceList = ({
  filters,
}: {
  filters: Filters
}): UseFetchTrafficSourcesItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [trafficSourceItems, setTrafficSourcesItems] = useState<TrafficSourceItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/settings/trafficsource`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const trafficSourcesItems = response.data.map((item: TrafficSourcesItemFromApi) =>
      trafficSourcesItemFromApi(item)
    )

    setTrafficSourcesItems(trafficSourcesItems)
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
    trafficSourceItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchTrafficSourceList
