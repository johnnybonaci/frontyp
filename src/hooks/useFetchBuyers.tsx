import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import usePaginatedFetch from 'hooks/usePaginatedFetch'

interface Buyers {
  id: string
  name: string
}

interface UseFetchBuyersProps {
  filters: Filters
}

interface UseFetchBuyersReturn {
  buyers: Buyers[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchBuyers = ({ filters }: UseFetchBuyersProps): UseFetchBuyersReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [buyers, setBuyers] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/partners`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const buyers = response.data.map((buyer: any) => {
      return { id: buyer.id, name: buyer.name }
    })
    setBuyers(buyers)
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
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return {
    buyers,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchBuyers
