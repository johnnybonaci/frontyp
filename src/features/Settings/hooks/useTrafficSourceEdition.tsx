import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { TrafficSourceForm } from '../types'
import { trafficSourceEditedToAPI } from '../transformers/traficSourceTransfomers.ts'

export interface UseTrafficSourceEditionReturn {
  onSubmit: (data: TrafficSourceForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useTrafficSourceEdition = (trafficSource?: number): UseTrafficSourceEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.trafficSource' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: TrafficSourceForm): Promise<void> => {
    if (trafficSource)
      doFetch({
        url: `${config.api.baseUrl}/api/v1/pubs/update/${trafficSource}`,
        data: trafficSourceEditedToAPI(data),
        method: 'POST',
      })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('trafficSourceEditedSuccessfully'), {
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
