import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { DidNumberForm } from '../../types/DidNumber/index'
import { didNumberEditedToAPI } from '../../transformers/DidNumber'

export interface UseDidNumberEditionReturn {
  onSubmit: (data: DidNumberForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useDidNumberEdition = (didNumber?: number): UseDidNumberEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.didNumber' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: DidNumberForm): Promise<void> => {
    if (didNumber)
      return doFetch({
        url: `${config.api.baseUrl}/api/v1/did/update/${didNumber}`,
        data: didNumberEditedToAPI(data),
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
