import { useEffect, useState } from 'react'
import useFetch from 'hooks/useFetch.ts'
import { type RequestError } from 'hooks/useFetch.ts'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import config from '../config.tsx'

interface UseFetchUsersResponse {
  userOptions: Option[]
  loading: boolean
  error: RequestError
}

const useFetchUsers = (): UseFetchUsersResponse => {
  const [userOptions, setUserOptions] = useState<Option[]>([])
  const [error] = useState<RequestError>(null)

  const { doFetch, response, loading } = useFetch(`${config.api.baseUrl}/api/data/users`, {
    params: {
      size: 1000,
      page: 1,
    },
  })

  useEffect(() => {
    if (!response) return

    const { data } = response

    setUserOptions(
      data.map(({ id, user_name }: any) => ({
        id,
        title: user_name,
      }))
    )
  }, [response])

  useEffect(() => {
    void doFetch()
  }, [doFetch])

  return {
    userOptions,
    loading,
    error,
  }
}

export default useFetchUsers
