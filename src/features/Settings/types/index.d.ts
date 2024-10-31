import { SETTINGS_PATHS } from '../routes'

type SettingKeys = keyof typeof SETTINGS_PATHS
interface SettingTab {
  label: string
  path: (typeof SETTINGS_PATHS)[SettingKeys]
}
