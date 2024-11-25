import { useState, useEffect, useCallback, useMemo } from 'react'
import useFetch from './useFetch'
import { type Paginator } from '../types/paginator'
import { type Filters } from '../types/filter'
import { useSearchParams } from 'react-router-dom'
import clearObject from 'utils/clearObject'
import { useTranslation } from 'react-i18next'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { Sorter } from 'types/sorter'

interface PaginatedFetchProps {
  initialPerPage?: number
  initialPage?: number
  url: string
  filters?: Filters
  config?: any
  options?: FilterRequestOptions
  defaultSorter?: { fieldName: string; order: 'asc' | 'desc' | undefined }
  persistConfig?: boolean
}

export interface FilterRequestOptions {
  updatePath?: boolean
}

interface PaginatedFetchResult {
  doFetch?: () => Promise<any>
  retry: () => void
  response: any // Adjust this type according to your response data structure
  paginator: Paginator
  loading: boolean
  error: any // Adjust this type according to your error data structure
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const usePaginatedFetch = ({
  initialPerPage = 10,
  initialPage = 1,
  url,
  filters,
  config,
  options = {},
  defaultSorter,
  persistConfig = true,
}: PaginatedFetchProps): PaginatedFetchResult => {
  const { t } = useTranslation('common')
  const [skipFirstRender, setSkipFirstRender] = useState(true)
  const { updatePath } = options
  const [searchParams, setSearchParams] = useSearchParams()
  const [perPage, setPerPage] = useState(
    updatePath && searchParams.get('perPage') ? Number(searchParams.get('perPage')) : initialPerPage
  )
  const [page, setPage] = useState(
    updatePath && searchParams.get('page') ? Number(searchParams.get('page')) : initialPage
  )

  const urlSorterField = persistConfig
    ? searchParams.get('sortField') || defaultSorter?.fieldName
    : defaultSorter?.fieldName
  const urlSorterOrder = persistConfig
    ? (searchParams.get('sortOrder') as 'asc' | 'desc' | undefined) || defaultSorter?.order
    : defaultSorter?.order

  const [currentSorter, setCurrentSorter] = useState<Sorter | undefined>(
    urlSorterField && urlSorterOrder
      ? { fieldName: urlSorterField, order: urlSorterOrder }
      : defaultSorter
  )

  const setSorter = (fieldName: string, order: 'asc' | 'desc' | undefined): void => {
    setCurrentSorter({
      fieldName,
      order,
    })
  }

  const paginatedConfig = {
    ...config,
    params: clearObject({
      size: perPage,
      ...filters,
      sort:
        currentSorter?.fieldName && currentSorter?.order
          ? multipleSelectToApi(
              [{ field: currentSorter?.fieldName, dir: currentSorter?.order }],
              (item: any) => {
                return { field: item.field, dir: item.dir }
              }
            )
          : undefined,
      page,
    }),
  }

  const {
    doThrottledFetch: doFetch,
    retry,
    response,
    loading,
    error,
  } = useFetch(url, paginatedConfig)

  useEffect(() => {
    if (!skipFirstRender) {
      setPage(1)
    } else {
      setSkipFirstRender(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => {
    if (doFetch) {
      doFetch()
    }
  }, [doFetch])

  const onChangePage = useCallback(
    (newPage: number) => {
      setPage(newPage + 1)
      if (updatePath) {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          page: String(newPage + 1),
        })
      }
    },
    [updatePath, searchParams, setSearchParams]
  )

  const onChangePerPage = useCallback(
    (newPerPage: number) => {
      setPerPage(newPerPage)
      setPage(1)
      if (updatePath) {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          page: '1',
          perPage: String(newPerPage),
        })
      }
    },
    [updatePath, searchParams, setSearchParams]
  )

  const paginatedResponse = useMemo(
    () => (error?.message ? { ...response, data: [] } : response),
    [error?.message, response]
  )

  return {
    doFetch,
    retry,
    response: paginatedResponse,
    sorter: currentSorter,
    setSorter,
    paginator: {
      lastPage: response?.last_page || 0,
      displayResultsMessage: t('showingResults', {
        from: response?.from,
        to: response?.to,
        total: response?.total,
      }),
      page: response?.current_page || page,
      perPage: response?.per_page || initialPerPage,
      setPage: onChangePage,
      setPerPage: onChangePerPage,
    },
    loading,
    error,
  }
}

export default usePaginatedFetch
