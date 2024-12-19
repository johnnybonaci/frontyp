import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AdsClickOutlined,
  AssessmentOutlined,
  BarChartOutlined,
  CallOutlined,
  CheckCircleOutline,
  GroupsOutlined,
  GroupWorkOutlined,
  InsertChartOutlined,
  ManageAccountsOutlined,
  PersonOutlined,
  PhoneEnabledOutlined,
  SupervisedUserCircleOutlined,
  TrendingUpOutlined,
  VerifiedUserOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { type SidebarComponents } from 'components/PrivateLayout/types'
import PERMISSIONS from 'permissions'
import { SETTINGS_PATHS } from 'features/Settings/routes'
import { LIVE_LEADS_PATHS } from 'features/LiveLeads/routes'
import { ACTIVE_LEADS_PATHS } from 'features/ActiveLeads/routes'
import { PUB_LEADS_PATHS } from 'features/PubLeads/routes'
import { CALL_REPORT_PATHS } from 'features/CallReport/routes'
import { CPA_REPORT_PATHS } from 'features/CPAReport/routes'
import { QA_REPORT_PATHS } from 'features/QAReport/routes'
import { CPC_REPORT_PATHS } from 'features/CPCReport/routes.tsx'
import { COMPLIANCE_PATHS } from 'features/Compliance/routes.tsx'
import useData from 'hooks/useData.tsx'
import { COMPLIANCE_BOT_PATHS } from 'features/ComplianceBot/routes.tsx'
import { PHONE_ROOM_PERFORMANCE_PATHS } from 'features/PhoneRoomPerformance/routes.tsx'
import { PHONE_ROOM_LEADS_PATHS } from 'features/PhoneRoomLeads/routes.tsx'
import { PHONE_ROOM_REPORTS_PATHS } from 'features/PhoneRoomReports/routes.tsx'
import { USER_PATHS } from 'features/Users/routes'
import { ROLE_PATHS } from 'features/Roles/routes'

export interface UseSidebarComponentsResult {
  components: SidebarComponents
}

export default function useSidebarComponents(): UseSidebarComponentsResult {
  const { TRACKDRIVE_PROVIDER_ID } = useData()
  const { t } = useTranslation()

  const phoneRoom =
    TRACKDRIVE_PROVIDER_ID === '2'
      ? [
          {
            title: t('menu:phoneRoom'),
            permission: PERMISSIONS.PHONE_ROOM,
            items: [
              {
                to: PHONE_ROOM_LEADS_PATHS.LIST,
                redirectOutside: false,
                icon: PhoneEnabledOutlined,
                label: t('menu:phoneRoomLeads'),
              },
              {
                to: PHONE_ROOM_PERFORMANCE_PATHS.LIST,
                redirectOutside: false,
                icon: TrendingUpOutlined,
                label: t('menu:phoneRoomPerformance'),
              },
              {
                to: PHONE_ROOM_REPORTS_PATHS.LIST,
                redirectOutside: false,
                icon: InsertChartOutlined,
                label: t('menu:phoneRoomReports'),
              },
            ],
          },
        ]
      : []

  const components = useMemo(
    () => [
      {
        title: t('menu:leads'),
        permission: PERMISSIONS.LEADS,
        items: [
          {
            to: LIVE_LEADS_PATHS.LIST,
            icon: GroupsOutlined,
            label: t('menu:liveLeads'),
          },
          {
            to: ACTIVE_LEADS_PATHS.LIST,
            icon: SupervisedUserCircleOutlined,
            label: t('menu:activeLeads'),
          },
          {
            to: PUB_LEADS_PATHS.LIST,
            icon: GroupWorkOutlined,
            label: t('menu:pubsLeads'),
          },
          {
            to: CPC_REPORT_PATHS.LIST,
            redirectOutside: false,
            icon: BarChartOutlined,
            label: t('menu:cpcReport'),
          },
        ],
      },
      {
        title: t('menu:calls'),
        permission: PERMISSIONS.CALLS,
        items: [
          {
            to: CALL_REPORT_PATHS.LIST,
            icon: CallOutlined,
            label: t('menu:callsReport'),
          },
          {
            to: CPA_REPORT_PATHS.LIST,
            icon: AssessmentOutlined,
            label: t('menu:cpaReport'),
          },
          {
            to: QA_REPORT_PATHS.LIST,
            icon: CheckCircleOutline,
            label: t('menu:qaReport'),
          },
        ],
      },
      {
        title: t('menu:campaigns'),
        permission: PERMISSIONS.CAMPAIGNS,
        items: [
          {
            to: 'leads/campaign-dashboard',
            icon: AdsClickOutlined,
            label: t('menu:callCampaigns'),
          },
        ],
      },
      {
        title: t('menu:compliance'),
        permission: PERMISSIONS.JORNAYA,
        items: [
          {
            to: TRACKDRIVE_PROVIDER_ID === '1' ? COMPLIANCE_BOT_PATHS.LIST : COMPLIANCE_PATHS.LIST,
            redirectOutside: false,
            icon: VerifiedUserOutlined,
            label: t('menu:compliance'),
          },
        ],
      },
      ...phoneRoom,
      {
        title: t('menu:users'),
        permission: PERMISSIONS.USERS,
        items: [
          {
            to: USER_PATHS.LIST,
            icon: PersonOutlined,
            label: t('menu:userList'),
          },
          {
            to: ROLE_PATHS.LIST,
            icon: ManageAccountsOutlined,
            label: t('menu:userRoles'),
          },
        ],
      },
      {
        title: t('menu:settings'),
        permission: PERMISSIONS.SETTINGS,
        items: [
          {
            to: SETTINGS_PATHS.BASE + '/' + SETTINGS_PATHS.PUBID,
            icon: SettingsOutlined,
            label: t('menu:settings'),
          },
        ],
      },
    ],
    [t, phoneRoom, TRACKDRIVE_PROVIDER_ID]
  )

  return { components }
}
