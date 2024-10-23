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
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' },
    { id: 'n/a', title: 'N/A' },
  ])

  return {
    saleOptions,
    insuranceOptions,
  }
}

export default useFetchCallReportFilterOptions
