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
  TRACKDRIVE_PROVIDER_ID: '2',
  leadTypeOptions: [],
  campaignOptions: [],
  subIdOptions: [],
  providersOptions: [],
  rolesOptions: [],
  loading: false,
  error: null,
})

export default ScreenContext
