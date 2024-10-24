// import { type ReactNode } from 'react'
// import styles from './dashboard.module.scss'
//
// const Dashboard = (): ReactNode => {
//   return <div className={styles.wrapper}>dashboard</div>
// }
//
// export default Dashboard

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Obtener el CSRF token al cargar
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await axios.get('http://localhost:3000/sanctum/csrf-cookie')
      } catch (err) {
        console.error('Error obteniendo CSRF token:', err)
      }
    }
    getCsrfToken()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const loginData = {
        email,
        password,
      }

      if (remember) {
        loginData.remember = 'on'
      }

      await axios.post('http://localhost:3000/login', loginData)

      const { data } = await axios.get('http://localhost:3000/api/v1/user')
      setUser(data)
    } catch (err) {
      setErrorMessage('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
      setEmail('')
      setPassword('')
      setRemember(false)
    } catch (err) {
      console.error('Error en logout:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
          <div className="mb-4">
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Nombre: {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => {
                    setRemember(!remember)
                  }}
                  className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>
            </div>

            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Dashboard
