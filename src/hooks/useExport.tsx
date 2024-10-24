import useFetch, { type RequestError } from './useFetch'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'

type DownloadFilters = Record<string, any>

interface DownloadOptions {
  url: string
  filters: DownloadFilters
  fileName: string
}

const useExport = (
  options: DownloadOptions
): {
  data: Blob | null
  error: RequestError | null
  isLoading: boolean
  doFetch: (params?: any, options?: { isPollingFetch?: boolean }) => Promise<any>
} => {
  const { response, doFetch, error, loading } = useFetch(options.url, {
    params: options.filters,
    responseType: 'blob',
  })
  const { t } = useTranslation()

  useEffect(() => {
    if (response) {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${options.fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
      enqueueSnackbar(t('downloadSuccess'), {
        variant: 'success',
      })
    }
  }, [response])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      })
    }
  }, [error])

  return { isLoading: loading, data: response, error, doFetch }
}

export default useExport
