import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'

export interface UseEditInsuranceReturn {
  doTranscript: (callReportId: number, data?: any) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useTranscript = (): UseEditInsuranceReturn => {
  const { t } = useTranslation()
  const { doFetch, error, loading } = useFetch(`${config.api.baseUrl}/api/data/transcript`, {
    method: 'POST',
  })

  const doTranscript = async (callReportId: number, data: any = {}): Promise<void> => {
    try {
      await doFetch({
        data: {
          id: callReportId,
          ...data,
        },
      })
      enqueueSnackbar(t('features:CallReport.transcriptSuccessfully'), {
        variant: 'success',
        autoHideDuration: 2000,
      })
    } catch (err) {
      enqueueSnackbar(t('genericError'), { variant: 'error', autoHideDuration: 2000 })
    }
  }

  return {
    doTranscript,
    loading,
    error,
  }
}
