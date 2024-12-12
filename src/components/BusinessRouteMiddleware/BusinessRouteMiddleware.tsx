import { type FC } from 'react'
import { type BusinessRouteMiddlewareProps } from 'components/BusinessRouteMiddleware/types'
import useData from 'hooks/useData.tsx'
import { useNavigate } from 'react-router-dom'

const BusinessRouteMiddleware: FC<BusinessRouteMiddlewareProps> = ({
  children,
  trackDriveProviderAllowed = ['1', '2'],
}) => {
  const { TRACKDRIVE_PROVIDER_ID } = useData()
  const navigate = useNavigate()

  if (!trackDriveProviderAllowed.includes(TRACKDRIVE_PROVIDER_ID)) {
    navigate('/404')
  }

  return <>{children}</>
}

export default BusinessRouteMiddleware
