import { useCookies } from 'react-cookie'
import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch'

interface UseLoginFetchResult {
  doLogin: (email: string, password: string) => Promise<any>
  loading: boolean
  error: RequestError

}

export default function useLoginFetch(): UseLoginFetchResult {

  const { doFetch } = useFetch(`${config.api.msAuth.baseUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
  })

  const [cookies] = useCookies(['XSRF-TOKEN'])

  const doLogin = async (email: string, password: string): Promise<any> => {
    try {
      const csrfResponse = await fetch(`${config.api.msAuth.baseUrl}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!csrfResponse.ok) {
        throw new Error('Failed to fetch CSRF token')
      }
      const csrfToken = cookies['XSRF-TOKEN']

      if (!csrfToken) {
        throw new Error('CSRF mismatch')
      }

      console.log('Token CSRF obtenido:', csrfToken)

      await doFetch({
        data: {
          email,
          password,
          platform: config.api.platform,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      })
      return await Promise.resolve(true)

    } catch (err: any) {
      throw new Error(err.message || 'Unknown error')
    }
  }

  return { doLogin, loading: false, error: null }
}
