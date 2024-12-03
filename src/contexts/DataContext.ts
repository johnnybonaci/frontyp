import { createContext } from 'react'
import { type UseFetchDataResponse } from 'hooks/useFetchData.tsx'

const ScreenContext = createContext<UseFetchDataResponse>({
  stateOptions: [],
  buyerOptions: [],
  trafficSourceOptions: [],
  issueTypeOptions: [],
  offersOptions: [],
  pubIdOptions: [],
  callBuyerOptions: [],
  statusOptions: [],
  insuranceOptions: [],
  callIssuesOptions: [],
  saleOptions: [],
  leadTypeOptions: [],
  campaignOptions: [],
  subIdOptions: [],
  providersOptions: [],
  loading: false,
  error: null,
})

export default ScreenContext
