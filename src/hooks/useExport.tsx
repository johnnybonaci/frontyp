import useFetch, { type RequestError } from './useFetch'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'

type DownloadFilters = Record<string, any>

interface DownloadOptions {
  url: string
  filters: DownloadFilters
}

const useDownloadDocument = (
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
      const blob = new Blob([response], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'export.pdf'
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

export default useDownloadDocument
