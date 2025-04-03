import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'

export interface UseEditInsuranceReturn {
  regenerate: (callReportId: number, data?: any) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useRegenerate = (): UseEditInsuranceReturn => {
  const { t } = useTranslation()
  const { doFetch, error, loading } = useFetch(`${config.api.baseUrl}/api/data/reprocess`, {
    method: 'POST',
  })

  const regenerate = async (callReportId: number, data: any = {}): Promise<void> => {
    try {
      await doFetch({
        data: {
          id: callReportId,
          ...data,
        },
      })
      enqueueSnackbar(t('features:CallReport.regeneratedSuccessfully'), {
        variant: 'success',
        autoHideDuration: 2000,
      })
    } catch (err) {
      enqueueSnackbar(t('genericError'), { variant: 'error', autoHideDuration: 2000 })
    }
  }

  return {
    regenerate,
    loading,
    error,
  }
}
