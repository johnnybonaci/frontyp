import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type ReportLeadsItem, type ReportLeadsItemFromApi } from 'features/ReportLeads/types'
import { reportLeadsItemFromApi } from 'features/ReportLeads/transformers'

interface UseFetchReportLeadsItemsResponse {
  reportLeadsItems: ReportLeadsItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchReportLeadsList = ({
  filters,
}: {
  filters: Filters
}): UseFetchReportLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [reportLeadsItems, setReportLeadsItems] = useState<ReportLeadsItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/pageviews`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const reportLeadsItems = response.data.map((role: ReportLeadsItemFromApi) =>
      reportLeadsItemFromApi(role)
    )
    setReportLeadsItems(reportLeadsItems)
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
    reportLeadsItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchReportLeadsList
