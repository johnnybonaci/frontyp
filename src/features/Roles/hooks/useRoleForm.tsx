import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'
import config from 'src/config'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import { type RoleForm } from '../types'
import { roleEditedToAPI } from '../transformers'

export interface UseRolesEditionReturn {
  onSubmit: (data: RoleForm) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useRoleForm = (roleId?: number): UseRolesEditionReturn => {
  const { t } = useTranslation('features', { keyPrefix: 'Role' })
  const { doFetch, response, error, loading } = useFetch()

  const onSubmit = async (data: RoleForm): Promise<void> => {
    return doFetch({
      url: `${config.api.baseUrl}/api/data/roles/${roleId || ''}`,
      data: roleEditedToAPI(data),
      method: roleId ? 'PUT' : 'POST',
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
