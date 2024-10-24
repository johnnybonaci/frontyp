import { useEffect, useState } from 'react'
import useFetch from 'src/hooks/useFetch'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Option } from 'components/MultiSelect/MultiSelect.tsx'
import config from '../../../config.tsx'

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
  const [stateOptions, setStateOptions] = useState<Option[]>([])
  const [buyerOptions, setBuyerOptions] = useState<Option[]>([])
  const [trafficSourceOptions, setTrafficSourceOptions] = useState<Option[]>([])
  const [issueTypeOptions, setIssueTypeOptions] = useState<Option[]>([])
  const [offersOptions, setOffersOptions] = useState<Option[]>([])
  const [pubIdOptions, setPubIdOptions] = useState<Option[]>([])
  const [statusOptions, setStatusOptions] = useState<Option[]>([])
  const [insuranceOptions, setInsuranceOptions] = useState<Option[]>([])
  const [callIssuesOptions, setCallIssuesOptions] = useState<Option[]>([
    { id: '1', title: 'Yes' },
    { id: '0', title: 'No' },
    { id: '', title: 'All Options' },
  ])
  const [error] = useState<RequestError>(null)

  const { doFetch, response, loading } = useFetch(`${config.api.baseUrl}/api/data`)

  useEffect(() => {
    if (!response) return

    const data = response

    setStateOptions(
      data.states.map((option: any) => ({
        id: option.state,
        title: option.description,
      }))
    )
    setBuyerOptions(
      data.partners.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    setTrafficSourceOptions(
      data.traffic.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    setIssueTypeOptions(
      data.issueTypes.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    setOffersOptions(
      data.offers.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    setPubIdOptions(
      Object.keys(data.pub_id).map((key: any) => ({
        id: data.pub_id[key].id,
        title: data.pub_id[key].name,
      }))
    )
    setStatusOptions(
      data.statusTypes.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    setInsuranceOptions(
      data.insuranceTypes.map((option: any) => ({
        id: option.id,
        title: option.name,
      }))
    )
    // setCallIssuesOptions(
    //   data.callIssues?.map((option: any) => ({
    //     id: option.id,
    //     title: option.name,
    //   }))
    // )
  }, [
    response,
    setBuyerOptions,
    setStateOptions,
    setTrafficSourceOptions,
    setIssueTypeOptions,
    setOffersOptions,
    setPubIdOptions,
    setStatusOptions,
    setInsuranceOptions,
    setCallIssuesOptions,
  ])

  useEffect(() => {
    void doFetch()
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
