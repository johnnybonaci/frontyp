import api from 'src/api/axiosConfig';
import { useCookies } from 'react-cookie';
import config from 'src/config.tsx';

interface UseLoginFetchResult {
  doLogin: (email: string, password: string) => Promise<any>;
  loading: boolean;
  error: any;
}

export default function useLoginFetch(): UseLoginFetchResult {
  const [cookies] = useCookies(['XSRF-TOKEN']); // ✅ Hook para obtener cookies

  const doLogin = async (email: string, password: string): Promise<any> => {
    try {
      // 1️⃣ Obtener Token CSRF
      console.log("Solicitando CSRF Token...");
      const csrfResponse = await api.get('/sanctum/csrf-cookie');
      console.log("Respuesta de CSRF:", csrfResponse);

      // 2️⃣ Verificar Cookies
      console.log("Todas las cookies en el navegador:", document.cookie);
      console.log("Cookies obtenidas con react-cookie:", cookies);

      const csrfToken = cookies['XSRF-TOKEN'];

      if (!csrfToken) {
        throw new Error('CSRF token no encontrado en las cookies');
      }

      console.log("Token CSRF obtenido:", csrfToken);

      // 3️⃣ Hacer Login
      const loginResponse = await api.post(
        '/login',
        { email, password, platform: config.api.platform },
        { headers: { 'X-XSRF-TOKEN': csrfToken } }
      );

      console.log("Respuesta de login:", loginResponse);

      return true;
    } catch (err: any) {
      console.error("Error en doLogin:", err);
      throw new Error(err.message || "Error desconocido en el login");
    }
  };

  return { doLogin, loading: false, error: null };
}