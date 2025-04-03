import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type LeadReportItem, type LeadReportItemFromApi } from 'features/LeadReport/types'
import { leadReportItemFromApi } from 'features/LeadReport/transformers'

interface UseFetchLeadReportItemsResponse {
  leadReportItems: LeadReportItem[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchLeadReportList = ({
  filters,
}: {
  filters: Filters
}): UseFetchLeadReportItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [leadReportItems, setLeadReportItems] = useState<LeadReportItem[] | null>(null)

  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/pageviews`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const leadReportItems = response.data.map((role: LeadReportItemFromApi) =>
      leadReportItemFromApi(role)
    )

    setLeadReportItems(leadReportItems)
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
    leadReportItems,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchLeadReportList
