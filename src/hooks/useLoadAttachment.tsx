import { useEffect, useState } from 'react'
import config from '../config.tsx'
import { useTranslation } from 'react-i18next'
import { type RequestError } from 'hooks/useFetch.ts'
import useLoadFile from 'hooks/useLoadFile.tsx'
import { type File } from 'types/file'
import { fileFromApi } from '../transformers/fileTransformer.ts'

interface useLoadAttachmentProps {
  file?: File
  loading: boolean
  error: RequestError
  refresh: () => void
  doFetch: (
    params?: any,
    options?: { isPollingFetch?: boolean | undefined } | undefined
  ) => Promise<any>
}

const useLoadAttachment = (): useLoadAttachmentProps => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | undefined>(undefined)
  const { retry, response, loading, error, doFetch } = useLoadFile({
    url: `${config.api.msProcesses.baseUrl}/attachment`,
  })

  useEffect(() => {
    if (!response) return

    setFile(fileFromApi(response.data))
  }, [response?.data, response, t])

  return { file, doFetch, loading, error, refresh: retry }
}

export default useLoadAttachment
