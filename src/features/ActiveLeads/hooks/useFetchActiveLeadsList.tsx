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
  type ActiveLeadsAverages,
  type ActiveLeadsItem,
  type ActiveLeadsItemFromApi,
  type ActiveLeadsPercentages,
} from 'features/ActiveLeads/types'
import {
  activeLeadsAveragesFromApi,
  activeLeadsItemFromApi,
  activeLeadsPercentagesFromApi,
} from 'features/ActiveLeads/transformers'

interface UseFetchActiveLeadsItemsResponse {
  activeLeadsItems: ActiveLeadsItem[] | null
  activeLeadsAverages: ActiveLeadsAverages | null
  activeLeadsPercentages: ActiveLeadsPercentages | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchActiveLeadsList = ({
  filters,
  canSearch,
}: {
  filters: Filters
  canSearch: boolean
}): UseFetchActiveLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [activeLeadsItems, setActiveLeadsItems] = useState<ActiveLeadsItem[] | null>(null)
  const [activeLeadsAverages, setActiveLeadsAverages] = useState<ActiveLeadsAverages | null>(null)
  const [activeLeadsPercentages, setActiveLeadsPercentages] = useState<ActiveLeadsPercentages | null>(
    null
  )
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.mockUrl}/api/data/leads`,
    canSearch,
    filters: {
      ...filters,
    },
  })

  useEffect(() => {
    if (!response) return

    const activeLeadsItems = response.data.map((role: ActiveLeadsItemFromApi) =>
      activeLeadsItemFromApi(role)
    )

    setActiveLeadsAverages(activeLeadsAveragesFromApi(response.average))
    setActiveLeadsPercentages(activeLeadsPercentagesFromApi(response.totals_diff))
    setActiveLeadsItems(activeLeadsItems)
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
    activeLeadsItems,
    activeLeadsAverages,
    activeLeadsPercentages,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchActiveLeadsList
