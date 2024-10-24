import { useState } from 'react'
import { type Option } from 'components/MultiSelect/MultiSelect.tsx'

interface UseFetchCallReportFilterOptionsResponse {
  saleOptions: Option[]
  insuranceOptions: Option[]
}

const useFetchCallReportFilterOptions = (): UseFetchCallReportFilterOptionsResponse => {
  const [saleOptions] = useState<Option[]>([
    { id: 'Sale', title: 'Sale' },
    { id: 'No Sale', title: 'No Sale' },
    { id: 'Sale to Review', title: 'Sale to Review' },
  ])
  const [insuranceOptions] = useState<Option[]>([
    { id: 'Yes', title: 'Yes' },
    { id: 'No', title: 'No' },
    { id: ' N/A', title: 'N/A' },
  ])

  return {
    saleOptions,
    insuranceOptions,
  }
}

export default useFetchCallReportFilterOptions
