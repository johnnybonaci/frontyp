export interface PhoneRoomLeadsItemFromApi {
  created_at: string
  email: string
  first_name: string
  last_name: string
  log: string
  phone: number
  phone_room_lead_id: number | null
  pub_list_id: number
  request: string
  status: string
  sub_id: string
  type: string
  vendors_yp: string
  yieldpro_lead_id: string
}

export interface PhoneRoomLeadsItem {
  createdAt: string
  email: string
  firstName: string
  lastName: string
  log: string
  phone: number
  phoneRoomLeadId: number | null
  pubListId: number
  request: string
  status: string
  subId: string
  type: string
  vendorsYp: string
  yieldproLeadId: string
}

export interface PhoneRoomLeadsIndicatorsFromApi {
  no_sent: number
  rejected: number
  sent: number
  success: number
  total: number
}

export interface PhoneRoomLeadsIndicators {
  noSent: number
  rejected: number
  sent: number
  success: number
  total: number
}
