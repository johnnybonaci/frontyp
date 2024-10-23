import { useEffect, useState } from 'react'
import useFetch from 'src/hooks/useFetch'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Option } from 'components/MultiSelect/MultiSelect.tsx'

interface UseFetchCallReportFilterOptionsResponse {
  stateOptions: Option[]
  buyerOptions: Option[]
  trafficSourceOptions: Option[]
  issueTypeOptions: Option[]
  offersOptions: Option[]
  pubIdOptions: Option[]
  statusOptions: Option[]
  insuranceOptions: Option[]
  callIssuesOptions: Option[]
  loading: boolean
  error: RequestError
}

const useFetchCallReportFilterOptions = (): UseFetchCallReportFilterOptionsResponse => {
  const [stateOptions, setStateOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'pending', title: 'Pending' },
    { id: 'approved', title: 'Approved' },
    { id: 'rejected', title: 'Rejected' },
  ])
  const [buyerOptions, setBuyerOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'buyer1', title: 'Buyer 1' },
    { id: 'buyer2', title: 'Buyer 2' },
    { id: 'buyer3', title: 'Buyer 3' },
  ])
  const [trafficSourceOptions, setTrafficSourceOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'Organic', title: 'Organic' },
    { id: 'Paid', title: 'Paid' },
  ])
  const [issueTypeOptions, setIssueTypeOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'issue1', title: 'Issue 1' },
    { id: 'issue2', title: 'Issue 2' },
    { id: 'issue3', title: 'Issue 3' },
  ])
  const [offersOptions, setOffersOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'offer1', title: 'Offer 1' },
    { id: 'offer2', title: 'Offer 2' },
    { id: 'offer3', title: 'Offer 3' },
  ])
  const [pubIdOptions, setPubIdOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'pub1', title: 'Pub 1' },
    { id: 'pub2', title: 'Pub 2' },
    { id: 'pub3', title: 'Pub 3' },
  ])
  const [statusOptions, setStatusOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'active', title: 'Active' },
    { id: 'inactive', title: 'Inactive' },
  ])
  const [insuranceOptions, setInsuranceOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'insurance1', title: 'Insurance 1' },
    { id: 'insurance2', title: 'Insurance 2' },
    { id: 'insurance3', title: 'Insurance 3' },
  ])
  const [callIssuesOptions, setCallIssuesOptions] = useState<Option[]>([
    { id: 'all', title: 'All' },
    { id: 'callIssue1', title: 'Call Issue 1' },
    { id: 'callIssue2', title: 'Call Issue 2' },
    { id: 'callIssue3', title: 'Call Issue 3' },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<RequestError>(null)

  const { doFetch } = useFetch('/data/calls/filter-options') // Un solo endpoint

  useEffect(() => {
    setLoading(true)
    doFetch()
      .then((response) => {
        const data = response.data

        // Asignamos las opciones para cada MultiSelect
        setStateOptions(
          data.state.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setBuyerOptions(
          data.buyers.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setTrafficSourceOptions(
          data.trafficSource.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setIssueTypeOptions(
          data.issueType.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setOffersOptions(
          data.offers.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setPubIdOptions(
          data.pubId.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setStatusOptions(
          data.status.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setInsuranceOptions(
          data.insurance.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
        setCallIssuesOptions(
          data.callIssues.map((option: any) => ({
            value: option.id,
            label: option.name,
          }))
        )
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [doFetch])

  return {
    stateOptions,
    buyerOptions,
    trafficSourceOptions,
    issueTypeOptions,
    offersOptions,
    pubIdOptions,
    statusOptions,
    insuranceOptions,
    callIssuesOptions,
    loading,
    error,
  }
}

export default useFetchCallReportFilterOptions
