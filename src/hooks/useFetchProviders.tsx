import { useEffect, useState } from 'react'
import useFetch from 'hooks/useFetch.ts'
import { type RequestError } from 'hooks/useFetch.ts'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import config from '../config.tsx'

interface UseFetchProvidersResponse {
  providersOptions: Option[]
  loading: boolean
  error: RequestError
}

const useFetchProviders = (): UseFetchProvidersResponse => {
  const [providersOptions, setProviderOptions] = useState<Option[]>([])
  const [error] = useState<RequestError>(null)

  const { doFetch, response, loading } = useFetch(
    `${config.api.baseUrl}/api/data/settings/provider`,
    {
      params: {
        size: 1000,
        page: 1,
      },
    }
  )

  useEffect(() => {
    if (!response) return

    const { data } = response

    setProviderOptions(
      data.map(({ id, name }: any) => ({
        id,
        title: name,
      }))
    )
  }, [response])

  useEffect(() => {
    void doFetch()
  }, [doFetch])

  return {
    providersOptions,
    loading,
    error,
  }
}

export default useFetchProviders
