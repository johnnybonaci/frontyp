import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type DidNumberItem, type DidNumberItemFromApi } from '../../types/DidNumber'
import { didNumberItemFromApi } from '../../transformers/DidNumber'

interface UseFetchDidNumberItemsResponse {
  didNumberItems: DidNumberItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchDidNumberList = ({
  filters,
}: {
  filters: Filters
}): UseFetchDidNumberItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [didNumberItems, setDidNumberItems] = useState<DidNumberItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/settings/did`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const didNumbersItems = response.data.map((item: DidNumberItemFromApi) =>
      didNumberItemFromApi(item)
    )

    setDidNumberItems(didNumbersItems)
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
    didNumberItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchDidNumberList
