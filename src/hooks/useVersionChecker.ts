import { useEffect, useState } from 'react'

const STORAGE_KEY = 'app_version'

export default function useVersionChecker(intervalMs = 60000) {
    const [updateAvailable, setUpdateAvailable] = useState(false)

    useEffect(() => {
        const checkVersion = async () => {
            try {
                const res = await fetch('/version.txt', { cache: 'no-store' })
                const latestVersion = await res.text()
                const storedVersion = localStorage.getItem(STORAGE_KEY)

                if (!storedVersion) {
                    localStorage.setItem(STORAGE_KEY, latestVersion)
                } else if (storedVersion !== latestVersion) {
                    setUpdateAvailable(true)
                }
            } catch (err) {
                console.error('Error al verificar la versión:', err)
            }
        }

        checkVersion()
        const interval = setInterval(checkVersion, intervalMs)

        return () => clearInterval(interval)
    }, [])

    const refreshApp = async () => {
        try {
            const res = await fetch('/version.txt', { cache: 'no-store' })
            const latestVersion = await res.text()
            localStorage.setItem(STORAGE_KEY, latestVersion)
        } catch (err) {
            console.error('Error actualizando versión en localStorage:', err)
        } finally {
            window.location.reload()
        }
    }

    return { updateAvailable, refreshApp }
}
