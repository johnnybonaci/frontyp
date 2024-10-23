import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locale/en.json'
// Features
import enAuthJSON from 'src/features/Auth/locale/en.json'
import enCallReportJSON from 'src/features/CallReport/locale/en.json'

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

i18n.addResourceBundle('en', 'features', {
  Auth: enAuthJSON,
  CallReport: enCallReportJSON
})

export default i18n
