import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from './useFetch'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { useTranslation } from 'react-i18next'
import { multipleSelectToApi } from '../transformers/apiTransformers.ts'

interface PaginatedFetchProps {
  initialPerPage?: number
  initialPage?: number
  canSearch?: boolean
  url: string
  filters?: Filters
  defaultSorter?: { fieldName: string; order: 'asc' | 'desc' | undefined }
  config?: any
}

interface PaginatedFetchResult {
  doFetch?: () => void
  retry: () => void
  response: any
  paginator: Paginator
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  loading: boolean
  error: any
}

const usePaginatedFetch = ({
  initialPerPage = 10,
  initialPage = 1,
  url,
  filters,
  defaultSorter,
  config,
  canSearch,
}: PaginatedFetchProps): PaginatedFetchResult => {
  const { t } = useTranslation('common')
  const [searchParams, setSearchParams] = useSearchParams()

  const urlPage = Number(searchParams.get('page')) || initialPage
  const urlPerPage = Number(searchParams.get('perPage')) || initialPerPage
  const urlSorterField = searchParams.get('sortField') || defaultSorter?.fieldName
  const urlSorterOrder =
    (searchParams.get('sortOrder') as 'asc' | 'desc' | undefined) || defaultSorter?.order

  const [currentSorter, setCurrentSorter] = useState<Sorter | undefined>(
    urlSorterField && urlSorterOrder
      ? { fieldName: urlSorterField, order: urlSorterOrder }
      : defaultSorter
  )
  const [currentFilters, setCurrentFilters] = useState<Filters | undefined>(filters)
  const [perPage, setPerPage] = useState(urlPerPage)
  const [page, setPage] = useState(urlPage)

  const setSorter = (fieldName: string, order: 'asc' | 'desc' | undefined): void => {
    setCurrentSorter({
      fieldName,
      order,
    })
  }

  const paginatedConfig = {
    ...config,
    params: {
      size: perPage,
      ...currentFilters,
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
    },
  }

  const {
    doThrottledFetch: doFetch,
    retry,
    response,
    loading,
    error,
  } = useFetch(url, paginatedConfig)

  useEffect(() => {
    if (page) searchParams.set('page', String(page))
    if (perPage) searchParams.set('perPage', String(perPage))
    if (currentSorter?.fieldName && currentSorter?.order) {
      searchParams.set('sortField', currentSorter.fieldName)
      searchParams.set('sortOrder', currentSorter.order)
    }

    setSearchParams(searchParams)
  }, [page, perPage, currentSorter, setSearchParams])

  useEffect(() => {
    if (doFetch && canSearch) {
      void doFetch()
    }
  }, [doFetch, canSearch])

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(currentFilters)) {
      setCurrentFilters(filters)
      setPage(1)
    }
  }, [filters])

  useEffect(() => {
    setPage(1)
  }, [currentSorter])

  useEffect(() => {
    setPage(1)
  }, [perPage])

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    doFetch,
    retry,
    response,
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
      setPage,
      setPerPage,
    },
    loading,
    error,
  }
}

export default usePaginatedFetch
