import { Filters } from 'types/filter'
import {
  PubFromAPI,
  PubIdForm,
  PubIdItem,
  PubIdOffer,
  PubIdsItemFromApi,
  PubIdToAPI,
} from '../../types/PubId'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'
import { generateUniqueId } from 'utils/utils'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.name) {
    filter.push({
      field: 'name',
      type: 'like',
      value: filters.name,
    })
  }

  if (filters.pubs) {
    filter.push({
      field: 'id',
      type: 'like',
      value: filters.pubs,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const pubIdsItemFromApi = (data: PubIdsItemFromApi): PubIdItem => {
  const { id, name, cpl, pubs } = data
  const [ACA, MC] = pubs || []

  return {
    id,
    name,
    cpl,
    ACA: pubIdOfferFromAPI(ACA),
    MC: pubIdOfferFromAPI(MC),
  }
}

const pubIdOfferFromAPI = (pubFromAPI?: PubFromAPI): PubIdOffer => {
  const { interleave, setup, id } = pubFromAPI || {}
  const { call_center, traffic_source, provider, phone_room } = setup || {}
  const { list_id, campaign_id, id: callCenterId } = call_center || {}

  return {
    id: id ?? 0,
    sendToTD: Boolean(provider?.[2]),
    sendToTrualliant: Boolean(phone_room?.[2]),
    sendToPhoneRoom2: Boolean(phone_room?.[3]),
    sendToConvoso: Boolean(phone_room?.[4]),
    interleave: Boolean(interleave),
    listId: list_id?.[0],
    campaignId: campaign_id,
    trafficSourceId: traffic_source?.id,
    callCenterId: callCenterId && String(callCenterId),
  }
}

export const pubIdsToForm = (data: PubIdItem, userOptions: Option[]): PubIdForm => {
  const { id, name, cpl } = data

  return {
    id,
    name,
    form: Object.keys(cpl).map((key) => ({
      keyu: generateUniqueId(),
      cpl: String(cpl[key]),
      user: userOptions.find((option) => Number(option.id) === Number(key))!,
    })),
  }
}

export const pubIdEditedToAPI = (data: PubIdForm): PubIdToAPI => {
  const { form, id, name } = data

  const formData: Record<string, string> = {}

  form.forEach((formItem, index) => {
    formData[`cpl_${index + 1}`] = String(formItem.cpl)
    formData[`keyu_${index + 1}`] = String(index)
    formData[`user_p${index + 1}`] = String(formItem.user.id)
  })

  return {
    id,
    name,
    form: formData,
  }
}
