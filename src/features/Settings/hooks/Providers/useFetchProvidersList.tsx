import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type ProvidersItem, type ProvidersItemFromApi } from '../../types/Providers'
import { providersItemFromApi } from '../../transformers/Providers'

interface UseFetchProvidersItemsResponse {
  providersItems: ProvidersItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchProvidersList = ({
  filters,
}: {
  filters: Filters
}): UseFetchProvidersItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [providersItems, setProvidersItems] = useState<ProvidersItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/settings/provider`,
    canSearch: true,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const providerssItems = response.data.map((item: ProvidersItemFromApi) =>
      providersItemFromApi(item)
    )

    setProvidersItems(providerssItems)
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
    providersItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchProvidersList
