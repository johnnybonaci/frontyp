import { Link, useLocation } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone'
import { type FC } from 'react'
import { CALL_REPORT_PATHS } from 'features/CallReport/routes.tsx'

interface PhoneLinkProps {
  phone: string | number
  account: string
  name: string
  email: string
  typeOut: string
  vendor: string | number
}

const PhoneLink: FC<PhoneLinkProps> = ({ phone, account, name, email, typeOut, vendor }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const date_start = queryParams.get('date_start') || ''
  const date_end = queryParams.get('date_end') || ''

  const newQueryParams = new URLSearchParams({
    phone: phone.toString(),
    date_start,
    date_end,
    account,
    name: encodeURIComponent(name),
    email: encodeURIComponent(email),
    type_out: typeOut,
    vendor: vendor.toString(),
  }).toString()

  return (
    <Link
      to={`${CALL_REPORT_PATHS.LIST}?${newQueryParams}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PhoneIcon fontSize="small" />
      <span style={{ marginLeft: 6 }}>{phone}</span>
    </Link>
  )
}

export default PhoneLink
