import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type Permission } from 'features/Roles/types'
import useFetch from 'hooks/useFetch'

interface UseFetchRoleItemsResponse {
  permissionItems: Permission[] | null
  loading: boolean
}

const useFetchPermissionList = (): UseFetchRoleItemsResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [permissionItems, setPermissionItems] = useState<Permission[] | null>(null)
  const { doFetch, response, retry, loading, error } = useFetch(
    `${config.api.baseUrl}/api/data/permissions`
  )

  useEffect(() => {
    doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setPermissionItems(response.data)
  }, [response?.data, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        />
      ),
    })
  }, [error, t])

  return {
    permissionItems,
    loading,
  }
}

export default useFetchPermissionList
