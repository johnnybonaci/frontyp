import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../config.tsx'
import { useTranslation } from 'react-i18next'
import { type EditSaleFormValues } from 'features/CallReport/components/EditSaleForm/EditSaleForm.tsx'
import { enqueueSnackbar } from 'notistack'

export interface UseEditInsuranceReturn {
  editInsurance: (callReportId: number, data: EditSaleFormValues) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useEditInsurance = (): UseEditInsuranceReturn => {
  const { t } = useTranslation()
  const { doFetch, error, loading } = useFetch(`${config.api.baseUrl}/api/data/edit`, {
    method: 'POST',
  })

  const editInsurance = async (callReportId: number, data: EditSaleFormValues): Promise<void> => {
    try {
      await doFetch({
        data: {
          id: callReportId,
          insurance_value: data.insurance,
          billable: data.sale,
          insurance_name: data.insuranceName,
          call_ending_sooner_reason: data.issueType,
        },
      })
      enqueueSnackbar(t('features:CallReport.insuranceEditedSuccessfully'), {
        variant: 'success',
        autoHideDuration: 2000,
      })
    } catch (err) {
      enqueueSnackbar(t('genericError'), { variant: 'error', autoHideDuration: 2000 })
    }
  }

  return {
    editInsurance,
    loading,
    error,
  }
}
