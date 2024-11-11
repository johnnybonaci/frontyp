import * as Yup from 'yup'
import { TrafficSourceForm } from '../types'

export const EMPTY_TRAFFIC_SOURCE: TrafficSourceForm = {
  name: '',
  providerId: 0,
  trafficSourceProviderId: 0,
}

const TrafficSourceSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  providerId: Yup.string().required('validations:required'),
  trafficSourceProviderId: Yup.string().required('validations:required'),
})

export default TrafficSourceSchema
