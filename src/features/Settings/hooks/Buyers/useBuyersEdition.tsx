import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { BuyersForm } from '../../types/Buyers'
import { buyersEditedToAPI } from '../../transformers/Buyers'

export interface UseBuyersEditionReturn {
  onSubmit: (data: BuyersForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useBuyersEdition = (buyers?: number): UseBuyersEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.buyers' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: BuyersForm): Promise<void> => {
    if (buyers)
      return doFetch({
        url: `${config.api.baseUrl}/api/v1/buyer/update/${buyers}`,
        data: buyersEditedToAPI(data),
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
