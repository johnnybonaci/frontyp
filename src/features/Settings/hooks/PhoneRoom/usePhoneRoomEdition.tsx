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
      doFetch({
        url: `${config.api.baseUrl}/api/v1/trafficsource/update/${phoneRoom}`,
        data: phoneRoomEditedToAPI(data),
        method: 'POST',
      })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('phoneRoomEditedSuccessfully'), {
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
