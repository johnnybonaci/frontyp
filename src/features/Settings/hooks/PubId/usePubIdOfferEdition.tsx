import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { PubIdItem, PubIdOffer } from '../../types/PubId'
import { pubIdOfferEditedToAPI } from 'features/Settings/transformers/PubId/index.ts'

export interface UsePubIdOfferEditionReturn {
  onSubmit: (data: Required<PubIdOffer>, pub: PubIdItem) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const usePubIdOfferEdition = (pubOfferId?: number): UsePubIdOfferEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: Required<PubIdOffer>, pub: PubIdItem): Promise<void> => {
    return doFetch({
      url: `${config.api.baseUrl}/api/v1/pubsoffer/update/${pubOfferId !== undefined ? pubOfferId : ''}`,
      data: pubIdOfferEditedToAPI(data, pub),
      method: 'POST',
    })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('common:genericEdition', { type: t('singular') }), {
      variant: 'success',
      autoHideDuration: 2000,
    })
  }, [response])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message || t('common:genericError'), {
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
