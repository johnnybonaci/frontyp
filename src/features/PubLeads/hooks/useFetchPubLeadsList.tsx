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
  type PubLeadsAverages,
  type PubLeadsItem,
  type PubLeadsItemFromApi,
  type PubLeadsPercentages,
} from 'features/PubLeads/types'
import {
  pubLeadsAveragesFromApi,
  pubLeadsItemFromApi,
  pubLeadsPercentagesFromApi,
} from 'features/PubLeads/transformers'

interface UseFetchPubLeadsItemsResponse {
  pubLeadsItems: PubLeadsItem[] | null
  pubLeadsAverages: PubLeadsAverages | null
  pubLeadsPercentages: PubLeadsPercentages | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchPubLeadsList = ({ filters }: { filters: Filters }): UseFetchPubLeadsItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [pubLeadsItems, setPubLeadsItems] = useState<PubLeadsItem[] | null>(null)
  const [pubLeadsAverages, setPubLeadsAverages] = useState<PubLeadsAverages | null>(null)
  const [pubLeadsPercentages, setPubLeadsPercentages] = useState<PubLeadsPercentages | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/leads`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const pubLeadsItems = response.data.map((role: PubLeadsItemFromApi) =>
      pubLeadsItemFromApi(role)
    )

    setPubLeadsAverages(pubLeadsAveragesFromApi(response.average))
    setPubLeadsPercentages(pubLeadsPercentagesFromApi(response.totals_diff))
    setPubLeadsItems(pubLeadsItems)
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
    pubLeadsItems,
    pubLeadsAverages,
    pubLeadsPercentages,
    paginator,
    loading,
    error,
    refresh: retry,
    sorter,
    setSorter,
  }
}

export default useFetchPubLeadsList
