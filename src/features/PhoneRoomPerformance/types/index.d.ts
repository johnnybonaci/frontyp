export interface PhoneRoomPerformanceItemFromApi {
  avg_dials: number
  call_count: number
  category: number
  code: string
  contact_rate: number
  cost_record: number
  cpl: number
  created_at: string
  data: {
    Status: string
    'Call Count': number
  }
  email: string
  first_name: string
  last_name: string
  phone: number
  profit_record: number
  pub_id: number
  pub_list_id: number
  record_count: number
  rev_record: number
  revenue: number
  sub_id: string
  sub_pub: string
  transfer_rate: number
  type: string
  vendors_yp: string
}

export interface PhoneRoomPerformanceItem {
  avgDials: number
  callCount: number
  category: number
  code: string
  contactRate: number
  costRecord: number
  cpl: number
  createdAt: string
  data: {
    status: string
    callCount: number
  }
  email: string
  firstName: string
  lastName: string
  phone: number
  profitRecord: number
  pubId: number
  pubListId: number
  recordCount: number
  revRecord: number
  revenue: number
  subId: string
  subPub: string
  transferRate: number
  type: string
  vendorsYp: string
}
