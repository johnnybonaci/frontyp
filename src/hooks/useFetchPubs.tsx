import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import usePaginatedFetch from 'hooks/usePaginatedFetch'

interface Pub {
  id: string
  name: string
}

interface UseFetchPubsProps {
  filters: Filters
}

interface UseFetchPubsReturn {
  pubs: Pub[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchPubs = ({ filters }: UseFetchPubsProps): UseFetchPubsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [pubs, setPubs] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/pubs`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const pubs = response.data.map((pub: any) => {
      return { id: pub.id, name: `${pub.id} - ${pub.name}` }
    })
    setPubs(pubs)
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
    pubs,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchPubs
