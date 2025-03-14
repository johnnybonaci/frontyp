import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const RPC_REPORT_PATHS = {
  LIST: '/rpc-report',
}

const RPCReportList = loadable(
  lazy(async () => await import('src/features/RPCReport/screen/RPCReportList'))
)

const RPCReportRoutes = [
  {
    path: RPC_REPORT_PATHS.LIST,
    element: <RPCReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default RPCReportRoutes
