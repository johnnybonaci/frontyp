import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { PubIdOffer } from '../../types/PubId'

export interface UsePubIdOfferEditionReturn {
  onSubmit: (data: PubIdOffer) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const usePubIdOfferEdition = (pubOfferId?: number): UsePubIdOfferEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: PubIdOffer): Promise<void> => {
    if (pubOfferId)
      doFetch({
        url: `${config.api.baseUrl}/api/v1/pubsoffer/update/${pubOfferId}`,
        data,
        method: 'POST',
      })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('pubIdEditedSuccessfully'), {
      variant: 'success',
      autoHideDuration: 2000,
    })
  }, [response])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(t(error.message, { defaultValue: 'genericError' }), {
      variant: 'error',
      autoHideDuration: 2000,
    })
  }, [error])

  return {
    onSubmit,
    loading,
    error,
  }
}
