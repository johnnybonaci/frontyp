import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { rpcReportIndicatorsFromApi, rpcReportItemFromApi } from 'features/RPCReport/transformers'
import { type RPCReportIndicators, type RPCReportItem } from 'features/RPCReport/types'

interface UseFetchRPCReportItemsResponse {
  rpcReportItems: RPCReportItem[] | null
  rpcReportIndicators: RPCReportIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchRPCReportList = ({
  filters,
}: {
  filters: Filters
}): UseFetchRPCReportItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [rpcReportItems, setCallReportItems] = useState<RPCReportItem[] | null>(null)
  const [rpcReportIndicators, setRpcReportIndicators] = useState<RPCReportIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/report-rpc`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const rpcReportItems = response.data.map(rpcReportItemFromApi)

    setRpcReportIndicators(rpcReportIndicatorsFromApi(response.widgets))
    setCallReportItems(rpcReportItems)
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
    rpcReportItems,
    rpcReportIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchRPCReportList
