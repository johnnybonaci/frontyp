import * as Yup from 'yup'
import { TrafficSourceForm } from '../../types/TrafficSource'

export const EMPTY_TRAFFIC_SOURCE: TrafficSourceForm = {
  id: 0,
  name: '',
  provider: { id: '', title: '' },
  trafficSourceProviderId: 0,
}

const TrafficSourceSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  provider: Yup.object().required('validations:required'),
  trafficSourceProviderId: Yup.string().required('validations:required'),
})

export default TrafficSourceSchema
