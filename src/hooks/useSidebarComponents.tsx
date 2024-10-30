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

export interface UseSidebarComponentsResult {
  components: SidebarComponents
}

export default function useSidebarComponents(): UseSidebarComponentsResult {
  const { t } = useTranslation()
  const components = useMemo(
    () => [
      {
        title: t('menu:leads'),
        permission: PERMISSIONS.LEADS,
        items: [
          {
            to: 'live-leads',
            icon: GroupsOutlined,
            label: t('menu:liveLeads'),
          },
          {
            to: 'active-leads',
            icon: SupervisedUserCircleOutlined,
            label: t('menu:activeLeads'),
          },
          {
            to: 'pub-leads',
            icon: GroupWorkOutlined,
            label: t('menu:pubsLeads'),
          },
          {
            to: 'leads/pageviews',
            redirectOutside: true,
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
            to: 'call-report',
            icon: CallOutlined,
            label: t('menu:callsReport'),
          },
          {
            to: 'cpa-report',
            icon: AssessmentOutlined,
            label: t('menu:cpaReport'),
          },
          {
            to: 'qa-report',
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
            redirectOutside: true,
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
            to: 'leads/jornaya-id',
            redirectOutside: true,
            icon: VerifiedUserOutlined,
            label: t('menu:compliance'),
          },
        ],
      },
      {
        title: t('menu:phoneRoom'),
        permission: PERMISSIONS.PHONE_ROOM,
        items: [
          {
            to: 'leads/phone-room',
            redirectOutside: true,
            icon: PhoneEnabledOutlined,
            label: t('menu:phoneRoomLeads'),
          },
          {
            to: 'leads/performance-phone-room',
            redirectOutside: true,
            icon: TrendingUpOutlined,
            label: t('menu:phoneRoomPerformance'),
          },
          {
            to: 'leads/reports-phone-room',
            redirectOutside: true,
            icon: InsertChartOutlined,
            label: t('menu:phoneRoomReports'),
          },
        ],
      },
      {
        title: t('menu:users'),
        permission: PERMISSIONS.USERS,
        items: [
          {
            to: 'users',
            redirectOutside: true,
            icon: PersonOutlined,
            label: t('menu:userList'),
          },
          {
            to: 'users/roles',
            redirectOutside: true,
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
            to: `/${SETTINGS_PATHS.BASE}`,
            icon: SettingsOutlined,
            label: t('menu:settings'),
          },
        ],
      },
    ],
    [t]
  )

  return { components }
}
