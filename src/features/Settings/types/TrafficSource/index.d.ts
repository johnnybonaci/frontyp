export interface TrafficSourcesItemFromApi {
  id: number
  name: string
  traffic_source_provider_id: number
  provider_id: number
  created_at: string
  updated_at: string
}

export interface TrafficSourceItem {
  id: number
  name: string
  trafficSourceProviderId: number
  providerId: number
}

export interface TrafficSourceForm extends Omit<TrafficSourceItem, 'providerId'> {
  provider: Required<Option>
}

export interface TrafficSourceToAPI
  extends Omit<TrafficSourcesItemFromApi, 'created_at' | 'updated_at' | 'updated_at'> {
  provider_id: string
  form: {
    provider_select: string
  }
}

export interface TrafficSourceFilter {
  name: string
  provider: string
  trafficSourceProviderId: string
}
