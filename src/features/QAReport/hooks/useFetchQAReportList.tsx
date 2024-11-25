import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { qaReportIndicatorsFromApi, qaReportItemFromApi } from 'features/QAReport/transformers'
import { type QAReportIndicators, type QAReportItem } from 'features/QAReport/types'

interface UseFetchQAReportItemsResponse {
  qaReportItems: QAReportItem[] | null
  qaReportIndicators: QAReportIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchQAReportList = ({ filters }: { filters: Filters }): UseFetchQAReportItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [qaReportItems, setQaReportItems] = useState<QAReportItem[] | null>(null)
  const [qaReportIndicators, setQaReportIndicators] = useState<QAReportIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/report-qa`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const qaReportItems = response.data.map(qaReportItemFromApi)

    setQaReportIndicators(qaReportIndicatorsFromApi(response.widgets))
    setQaReportItems(qaReportItems)
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
    qaReportItems,
    qaReportIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchQAReportList
