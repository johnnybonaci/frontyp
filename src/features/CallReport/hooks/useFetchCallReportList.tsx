import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import {
  type CallReportAverages,
  type CallReportItem,
  type CallReportItemFromApi,
  type CallReportPercentages,
} from 'features/CallReport/types'
import {
  callReportAveragesFromApi,
  callReportItemFromApi,
  callReportPercentagesFromApi,
} from 'features/CallReport/transformers'

interface UseFetchCallReportItemsResponse {
  callReportItems: CallReportItem[] | null
  callReportAverages: CallReportAverages | null
  callReportPercentages: CallReportPercentages | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchCallReportList = ({
  filters,
}: {
  filters: Filters
}): UseFetchCallReportItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [callReportItems, setCallReportItems] = useState<CallReportItem[] | null>(null)
  const [callReportAverages, setCallReportAverages] = useState<CallReportAverages | null>(null)
  const [callReportPercentages, setCallReportPercentages] = useState<CallReportPercentages | null>(
    null
  )
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/calls`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const callReportItems = response.data.map((role: CallReportItemFromApi) =>
      callReportItemFromApi(role)
    )

    setCallReportAverages(callReportAveragesFromApi(response.average))
    setCallReportPercentages(callReportPercentagesFromApi(response.totals_diff))
    setCallReportItems(callReportItems)
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
    callReportItems,
    callReportAverages,
    callReportPercentages,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchCallReportList
