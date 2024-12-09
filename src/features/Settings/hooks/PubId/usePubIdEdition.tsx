import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { PubIdForm } from '../../types/PubId'
import { pubIdEditedToAPI } from '../../transformers/PubId/index.ts'

export interface UsePubIdEditionReturn {
  onSubmit: (data: PubIdForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const usePubIdEdition = (pubId?: number): UsePubIdEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.pubId' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: PubIdForm): Promise<void> => {
    if (pubId)
      return doFetch({
        url: `${config.api.baseUrl}/api/v1/pubs/update/${pubId}`,
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
