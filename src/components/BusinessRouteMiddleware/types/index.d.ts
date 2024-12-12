import { type ReactNode } from 'react'
import { type TrackDriveProviderIdType } from 'hooks/useFetchData.tsx'

export interface BusinessRouteMiddlewareProps {
  children: ReactNode
  trackDriveProviderAllowed?: TrackDriveProviderIdType[]
}
