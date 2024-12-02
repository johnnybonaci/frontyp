import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { OffersForm } from '../../types/Offers/index'
import { offersEditedToAPI } from '../../transformers/Offers/index.ts'

export interface UseOffersEditionReturn {
  onSubmit: (data: OffersForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useOffersEdition = (offers?: number): UseOffersEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.offers' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: OffersForm): Promise<void> => {
    if (offers)
      doFetch({
        url: `${config.api.baseUrl}/api/v1/trafficsource/update/${offers}`,
        data: offersEditedToAPI(data),
        method: 'POST',
      })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('offersEditedSuccessfully'), {
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
