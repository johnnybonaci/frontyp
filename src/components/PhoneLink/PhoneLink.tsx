import { Link, useLocation } from 'react-router-dom'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import { type FC } from 'react'
import { CALL_REPORT_PATHS } from 'features/CallReport/routes.tsx'

interface PhoneLinkProps {
  phone: string | number
  account: string
  name: string
  email: string
  typeOut: string
  vendor: string | number
  status?: string
  hasCalls?: boolean
}

const PhoneLink: FC<PhoneLinkProps> = ({
  phone,
  account,
  name,
  email,
  typeOut,
  vendor,
  status,
  hasCalls,
}) => {
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

  let IconComponent = PhoneDisabledIcon
  let iconStyle = { color: '#9CA3AF' }

  if (hasCalls) {
    switch (status) {
      case 'Billable':
        IconComponent = PhoneForwardedIcon
        iconStyle = { color: '#16A34A' }
        break
      case 'Contact':
        IconComponent = PhoneForwardedIcon
        iconStyle = { color: '#F59E0B' }
        break
      default:
        IconComponent = PhoneForwardedIcon
        iconStyle = { color: '#2563EB' }
        break
    }
  }

  return (
    <Link
      // @ts-ignore
      to={hasCalls ? `${CALL_REPORT_PATHS.LIST}?${newQueryParams}` : undefined}
      style={{
        textDecoration: 'none',
        color: hasCalls ? iconStyle.color : '#9CA3AF',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: hasCalls ? 'auto' : 'none',
      }}
    >
      <IconComponent fontSize="small" style={iconStyle} />
      <span style={{ marginLeft: 6 }}>{phone}</span>
    </Link>
  )
}

export default PhoneLink
