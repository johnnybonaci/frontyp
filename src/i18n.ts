import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locale/en.json'
// Features
import enAuthJSON from 'src/features/Auth/locale/en.json'
import enCallReportJSON from 'src/features/CallReport/locale/en.json'
import enCPAReportJSON from 'src/features/CPAReport/locale/en.json'
import enRPCReportJSON from 'src/features/RPCReport/locale/en.json'
import enQAReportJSON from 'src/features/QAReport/locale/en.json'
import enLiveLeadsJSON from 'src/features/LiveLeads/locale/en.json'
import enActiveLeadsJSON from 'src/features/ActiveLeads/locale/en.json'
import enPubLeadsJSON from 'src/features/PubLeads/locale/en.json'
import enSettingsJSON from 'src/features/Settings/locale/en.json'
import enComplianceJSON from 'src/features/Compliance/locale/en.json'
import enHistoryLeadsJSON from 'src/features/HistoryLeads/locale/en.json'
import enLeadReportJSON from 'src/features/LeadReport/locale/en.json'
import enComplianceBotJSON from 'src/features/ComplianceBot/locale/en.json'
import enCallCampaignJSON from 'src/features/CallCampaigns/locale/en.json'
import enPhoneRoomLeadsJSON from 'src/features/PhoneRoomLeads/locale/en.json'
import enPhoneRoomReportsJSON from 'src/features/PhoneRoomReports/locale/en.json'
import enPhoneRoomPerformanceJSON from 'src/features/PhoneRoomPerformance/locale/en.json'
import enUserJSON from 'src/features/Users/locale/en.json'
import enRoleJSON from 'src/features/Roles/locale/en.json'
import replaceLast from 'utils/replaceLast'

void i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
  }, // Where we're gonna put translations' files
  fallbackLng: 'en', // Default language

  // have a common namespace used around the full app
  defaultNS: 'common',
  fallbackNS: 'common',

  interpolation: {
    escapeValue: false, // false prevents to html escape for special characters
  },
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
i18n.services.formatter.add('lowercase', (value: string) => {
  return value.toLowerCase()
})

i18n.services?.formatter?.add(
  '_toListRemaining',
  (values: string[], _, options: any = {}): string => {
    const { limit = 3 } = options
    const list = values.slice(0, limit)
    let trans

    if (values.length === 0) {
      trans = ''
    } else if (values.length > limit) {
      trans = `${list.join(', ')}... (+${values.length - limit} more)`
    } else {
      trans = replaceLast(list.join(', '), ',', ' and')
    }

    return trans
  }
)

i18n.addResourceBundle('en', 'features', {
  Auth: enAuthJSON,
  CallReport: enCallReportJSON,
  CPAReport: enCPAReportJSON,
  RPCReport: enRPCReportJSON,
  QAReport: enQAReportJSON,
  LiveLeads: enLiveLeadsJSON,
  ActiveLeads: enActiveLeadsJSON,
  PubLeads: enPubLeadsJSON,
  ComplianceBot: enComplianceBotJSON,
  Compliance: enComplianceJSON,
  HistoryLeads: enHistoryLeadsJSON,
  LeadReport: enLeadReportJSON,
  Settings: enSettingsJSON,
  CallCampaign: enCallCampaignJSON,
  PhoneRoomLeads: enPhoneRoomLeadsJSON,
  PhoneRoomReports: enPhoneRoomReportsJSON,
  PhoneRoomPerformance: enPhoneRoomPerformanceJSON,
  User: enUserJSON,
  Role: enRoleJSON,
})

export default i18n
