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
  complianceBotIndicatorsFromApi,
  complianceBotItemFromApi,
} from 'features/ComplianceBot/transformers'
import { type ComplianceBotIndicators, type ComplianceBotItem } from 'features/ComplianceBot/types'

interface UseFetchComplianceBotItemsResponse {
  complianceBotItems: ComplianceBotItem[] | null
  complianceBotIndicators: ComplianceBotIndicators | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchComplianceBotList = ({
  filters,
}: {
  filters: Filters
}): UseFetchComplianceBotItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [complianceBotItems, setComplianceBotItems] = useState<ComplianceBotItem[] | null>(null)
  const [complianceBotIndicators, setComplianceBotIndicators] =
    useState<ComplianceBotIndicators | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/jornayabot`,
    filters,
    options: { updatePath: true },
  })

  useEffect(() => {
    if (!response) return

    const complianceBotItems = response.data.map(complianceBotItemFromApi)

    setComplianceBotIndicators(complianceBotIndicatorsFromApi(response.totals))
    setComplianceBotItems(complianceBotItems)
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
    complianceBotItems,
    complianceBotIndicators,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchComplianceBotList
