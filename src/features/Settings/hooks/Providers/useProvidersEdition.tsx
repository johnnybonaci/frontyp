import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { ProvidersForm } from '../../types/Providers'
import { providersEditedToAPI } from '../../transformers/Providers'

export interface UseProvidersEditionReturn {
  onSubmit: (data: ProvidersForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useProvidersEdition = (providers?: number): UseProvidersEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.providers' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: ProvidersForm): Promise<void> => {
    if (providers)
      doFetch({
        url: `${config.api.baseUrl}/api/v1/buyer/update/${providers}`,
        data: providersEditedToAPI(data),
        method: 'POST',
      })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('providersEditedSuccessfully'), {
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
