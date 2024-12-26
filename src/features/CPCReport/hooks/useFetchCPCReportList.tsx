import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { cpcReportIndicatorsFromApi, cpcReportItemFromApi } from 'features/CPCReport/transformers'
import { type CPCReportIndicators, type CPCReportItem } from 'features/CPCReport/types'

interface UseFetchCPCReportItemsResponse {
  cpcReportItems: CPCReportItem[] | null
  cpcReportIndicators: CPCReportIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchCPCReportList = ({
  filters,
}: {
  filters: Filters
}): UseFetchCPCReportItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [cpcReportItems, setCpcReportItems] = useState<CPCReportItem[] | null>(null)
  const [cpcReportIndicators, setCpcReportIndicators] = useState<CPCReportIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/pageviews`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const cpcReportItems = response.data.map(cpcReportItemFromApi)

    setCpcReportIndicators(cpcReportIndicatorsFromApi(response.totals))
    setCpcReportItems(cpcReportItems)
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
    cpcReportItems,
    cpcReportIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchCPCReportList
