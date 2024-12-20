import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import config from 'src/config'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import { type UserForm } from '../types'
import { userEditedToAPI } from '../transformers'

export interface UseUsersEditionReturn {
  onSubmit: (data: UserForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useUserForm = (userId?: number): UseUsersEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.users' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: UserForm): Promise<void> => {
    return doFetch({
      url: `${config.api.baseUrl}/api/data/users/${userId || ''}`,
      data: userEditedToAPI(data),
      method: userId ? 'PUT' : 'POST',
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
