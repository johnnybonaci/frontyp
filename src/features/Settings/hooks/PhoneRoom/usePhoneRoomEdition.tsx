import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { PhoneRoomForm } from '../../types/PhoneRoom'
import { phoneRoomEditedToAPI } from '../../transformers/PhoneRoom/index.ts'

export interface UsePhoneRoomEditionReturn {
  onSubmit: (data: PhoneRoomForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const usePhoneRoomEdition = (phoneRoom?: number): UsePhoneRoomEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: PhoneRoomForm): Promise<void> => {
    if (phoneRoom)
      return doFetch({
        url: `${config.api.baseUrl}/api/v1/phoneroom/update/${phoneRoom}`,
        data: phoneRoomEditedToAPI(data),
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
