import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import SettingsTabs from '../components/Tabs'
import { Container } from '@mui/material'
import PrivateScreenTitle from 'components/PrivateScreenTitle'
import { useTranslation } from 'react-i18next'

function SettingsLayout(): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'Settings' })
  return (
    <Container maxWidth="xl">
      <PrivateScreenTitle title={t('title')} />
      <SettingsTabs />
      <Outlet />
    </Container>
  )
}

export default SettingsLayout
