import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import usePaginatedFetch from 'hooks/usePaginatedFetch'

interface Campaign {
  id: string
  name: string
}

interface UseFetchCampaignsProps {
  filters: Filters
}

interface UseFetchCampaignsReturn {
  campaigns: Campaign[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchCampaigns = ({ filters }: UseFetchCampaignsProps): UseFetchCampaignsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [campaigns, setCampaigns] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.baseUrl}/api/data/campaigns`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const campaigns = response.data.map((campaign: any) => {
      return { id: campaign.campaign_name, name: campaign.campaign_name }
    })
    setCampaigns(campaigns)
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
    campaigns,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchCampaigns
