import * as Yup from 'yup'

export const EMPTY_TRAFFIC_SOURCE_FILTERS = {
  name: '',
  providerId: '',
  trafficSourceProviderId: '',
}

const TrafficSourceFiltersSchema = Yup.object({
  name: Yup.string().nullable(),
  providerId: Yup.string().nullable(),
  trafficSourceProviderId: Yup.string().nullable(),
})

export default TrafficSourceFiltersSchema
