import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type HistoryLeadsItem, type HistoryLeadsItemFromApi } from 'features/HistoryLeads/types'
import { historyLeadsItemFromApi } from 'features/HistoryLeads/transformers'

interface UseFetchHistoryLeadsItemsResponse {
  historyLeadsItems: HistoryLeadsItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchHistoryLeadsList = ({
  filters,
}: {
  filters: Filters
}): UseFetchHistoryLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [historyLeadsItems, setHistoryLeadsItems] = useState<HistoryLeadsItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/leads`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const historyLeadsItems = response.data.map((role: HistoryLeadsItemFromApi) =>
      historyLeadsItemFromApi(role)
    )

    setHistoryLeadsItems(historyLeadsItems)
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
    historyLeadsItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchHistoryLeadsList
