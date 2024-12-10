import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { PubIdForm } from '../../types/PubId/index'
import { pubIdEditedToAPI } from '../../transformers/PubId/index.ts'

export interface UsePubIdFormReturn {
  onSubmit: (data: PubIdForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const usePubIdForm = (pubId?: number): UsePubIdFormReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: PubIdForm): Promise<void> => {
    return doFetch({
      url: pubId
        ? `${config.api.baseUrl}/api/v1/pubs/update/${pubId}`
        : `${config.api.baseUrl}/api/v1/pubs/create`,
      data: pubIdEditedToAPI(data),
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
