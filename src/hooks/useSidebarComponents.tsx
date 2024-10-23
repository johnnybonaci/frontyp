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
} from '@mui/icons-material'
import { type SidebarComponents } from 'components/PrivateLayout/types'

export interface UseSidebarComponentsResult {
  components: SidebarComponents
}

export default function useSidebarComponents(): UseSidebarComponentsResult {
  const { t } = useTranslation()
  const components = useMemo(
    () => [
      {
        title: t('menu:leads'),
        items: [
          {
            to: 'leads/live',
            redirectOutside: true,
            icon: GroupsOutlined,
            label: t('menu:liveLeads'),
          },
          {
            to: 'leads/active',
            redirectOutside: true,
            icon: SupervisedUserCircleOutlined,
            label: t('menu:activeLeads'),
          },
          {
            to: 'leads/publishers',
            redirectOutside: true,
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
        items: [
          {
            to: 'call-report',
            icon: CallOutlined,
            label: t('menu:callsReport'),
          },
          {
            to: 'leads/calls/cpa',
            redirectOutside: true,
            icon: AssessmentOutlined,
            label: t('menu:cpaReport'),
          },
          {
            to: 'leads/calls/qa',
            redirectOutside: true,
            icon: CheckCircleOutline,
            label: t('menu:qaReport'),
          },
        ],
      },
      {
        title: t('menu:campaigns'),
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
    ],
    [t]
  )

  return { components }
}
