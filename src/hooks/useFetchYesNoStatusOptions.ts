import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface YesNoOptionsReturn {
  yesNoStatusOptions: Array<{ value: boolean | 'all'; name: string }>
}

interface Options {
  includeAllOption?: boolean
}

export default function useFetchYesNoStatusOptions(options?: Options): YesNoOptionsReturn {
  const { includeAllOption = false } = options || {}
  const { t } = useTranslation()

  const yesNoStatusOptions = useMemo(() => {
    const defaultOptions = [
      { value: true, name: t('common:Yes') },
      { value: false, name: t('common:No') },
    ]

    return includeAllOption
      ? [{ value: 'all' as const, name: t('common:All') }, ...defaultOptions]
      : defaultOptions
  }, [t])

  return { yesNoStatusOptions }
}
