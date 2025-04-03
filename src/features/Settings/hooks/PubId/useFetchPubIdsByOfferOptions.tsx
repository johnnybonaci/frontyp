import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

import config from 'src/config'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useData from 'hooks/useData'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

interface UseFetchPubIdsByOfferResponse {
  pubIdsByOfferOptions: Option[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchPubIdsByOfferOptions = (offerId?: string): UseFetchPubIdsByOfferResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { pubIdOptions } = useData()
  const [pubIdsByOfferOptions, setPubIdsByOfferOptions] = useState<Option[]>([])

  const { doFetch, retry, response, loading, error } = useFetch()

  useEffect(() => {
    if (offerId) {
      doFetch({ url: `${config.api.baseUrl}/api/data/settings/pubsbyoffer/${offerId}` })
    } else {
      setPubIdsByOfferOptions([])
    }
  }, [offerId])

  useEffect(() => {
    if (!response) return

    const pubIdsByOfferOptions = response
      .map((pubId: number) => pubIdOptions.find((option) => String(option.id!) === String(pubId)))
      .filter(Boolean)

    setPubIdsByOfferOptions(pubIdsByOfferOptions)
  }, [response, t])

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
    pubIdsByOfferOptions,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchPubIdsByOfferOptions
