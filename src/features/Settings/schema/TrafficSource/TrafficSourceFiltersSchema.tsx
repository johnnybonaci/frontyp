import { TrafficSourceFilter } from 'features/Settings/types/TrafficSource'
import * as Yup from 'yup'

export const EMPTY_TRAFFIC_SOURCE_FILTERS: TrafficSourceFilter = {
  name: '',
  provider: '',
  trafficSourceProviderId: '',
}

const TrafficSourceFiltersSchema = Yup.object({
  name: Yup.string().nullable(),
  provider: Yup.object().nullable(),
  trafficSourceProviderId: Yup.string().nullable(),
})

export default TrafficSourceFiltersSchema
