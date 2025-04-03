import * as Yup from 'yup'
import { PubIdOffer } from '../../types/PubId'

export const EMPTY_PUB_ID_OFFER: PubIdOffer = {
  id: undefined,
  sendToTD: false,
  sendToTrualliant: false,
  sendToPhoneRoom2: false,
  sendToConvoso: false,
  interleave: false,
  listId: '1000',
  campaignId: '1000',
  trafficSourceId: '1000',
  callCenterId: '158',
}

const PubIdOfferSchema = Yup.object({
  id: Yup.number(),
  sendToTD: Yup.bool().required('validations:required'),
  sendToTrualliant: Yup.bool().required('validations:required'),
  sendToPhoneRoom2: Yup.bool().required('validations:required'),
  sendToConvoso: Yup.bool().required('validations:required'),
  interleave: Yup.bool().required('validations:required'),
  listId: Yup.string().required('validations:required'),
  campaignId: Yup.string().required('validations:required'),
  trafficSourceId: Yup.string().required('validations:required'),
  callCenterId: Yup.string().required('validations:required'),
})

export default PubIdOfferSchema
