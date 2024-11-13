import { Filters } from 'types/filter'
import {
  DidNumberFilter,
  DidNumberForm,
  DidNumberItem,
  DidNumberItemFromApi,
  DidNumberToAPI,
} from '../../types/DidNumber'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export const transformFiltersToApi = (filters: DidNumberFilter): Filters => {
  const filter = []

  if (filters.id) {
    filter.push({
      field: 'id',
      type: 'like',
      value: filters.id,
    })
  }

  if (filters.description) {
    filter.push({
      field: 'description',
      type: 'like',
      value: filters.description,
    })
  }

  if (filters.campaignName) {
    filter.push({
      field: 'campaign_name',
      type: 'like',
      value: filters.campaignName,
    })
  }

  if (filters.subId) {
    filter.push({
      field: 'sub_id',
      type: 'like',
      value: filters.subId,
    })
  }

  if (filters.pubId) {
    filter.push({
      field: 'pub_id',
      type: 'like',
      value: filters.pubId,
    })
  }

  if (filters.trafficSource) {
    filter.push({
      field: 'traffic_source_id',
      type: 'like',
      value: filters.trafficSource.id,
    })
  }

  if (filters.offer) {
    filter.push({
      field: 'offer_id',
      type: 'like',
      value: filters.offer.id,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const didNumberItemFromApi = (data: DidNumberItemFromApi): DidNumberItem => {
  const {
    id,
    description,
    campaign_name: campaignName,
    sub_id: subId,
    pub_id: pubId,
    traffic_source_id: trafficSourceId,
    offer_id: offerId,
  } = data
  return {
    id,
    description,
    campaignName,
    subId,
    pubId,
    trafficSourceId,
    offerId,
  }
}

export const didNumberToForm = (
  data: DidNumberItem,
  subIdOptions: Option[],
  trafficSourceOptions: Option[],
  offersOptions: Option[],
  pubIdOptions: Option[]
): DidNumberForm => {
  const { id, campaignName, subId, pubId, trafficSourceId, offerId, description } = data

  return {
    id,
    campaignName,
    sub: subIdOptions.find((option) => Number(option.id) === Number(subId)) as Option,
    pub: pubIdOptions.find((option) => Number(option.id) === Number(pubId)) as Option,
    trafficSource: trafficSourceOptions.find(
      (option) => Number(option.id) === Number(trafficSourceId)
    ) as Option,
    offer: offersOptions.find((option) => Number(option.id) === Number(offerId)) as Option,
    description,
  }
}

export const didNumberEditedToAPI = (data: DidNumberForm): DidNumberToAPI => {
  const { id, campaignName, sub, pub, trafficSource, offer, description } = data

  return {
    id,
    description,
    campaign_name: campaignName,
    sub_id: String(sub?.id),
    pub_id: String(pub?.id),
    traffic_source_id: String(trafficSource?.id),
    offer_id: String(offer?.id),
    form: {
      form_sub_id: String(sub?.id),
      offer_select: String(offer?.id),
      pub_select: String(pub?.id),
      traffic_source_select: String(trafficSource?.id),
    },
  }
}
