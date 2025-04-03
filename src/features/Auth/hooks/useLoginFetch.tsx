import api from 'src/api/axiosConfig';
import { useCookies } from 'react-cookie';
import config from 'src/config.tsx';

interface UseLoginFetchResult {
  doLogin: (email: string, password: string) => Promise<any>;
  loading: boolean;
  error: any;
}

export default function useLoginFetch(): UseLoginFetchResult {
  const [cookies] = useCookies(['XSRF-TOKEN']);

  const doLogin = async (email: string, password: string): Promise<any> => {
    try {
      await api.get(`${config.api.msAuth.baseUrl}/sanctum/csrf-cookie`);

      const csrfToken = cookies['XSRF-TOKEN'];

      if (!csrfToken) {
        throw new Error('CSRF mismatch');
      }

      await api.post(`${config.api.msAuth.baseUrl}/login`,
        { email, password, platform: config.api.platform },
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
          },
        }
      );
      return await Promise.resolve(true)

    } catch (err: any) {
      throw new Error(err.message || "Unknown error");
    }
  };

  return { doLogin, loading: false, error: null };
}