import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type OffersItem, type OffersItemFromApi } from '../../types/Offers'
import { offersItemFromApi } from '../../transformers/Offers'
import useData from 'hooks/useData'

interface UseFetchOffersItemsResponse {
  offersItems: OffersItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchOffersList = ({ filters }: { filters: Filters }): UseFetchOffersItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [offersItems, setOffersItems] = useState<OffersItem[] | null>(null)
  const { providersOptions } = useData()

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/settings/offer`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const offersItems = response.data.map((item: OffersItemFromApi) =>
      offersItemFromApi(item, providersOptions)
    )

    setOffersItems(offersItems)
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
    offersItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchOffersList
