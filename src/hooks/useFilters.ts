import { useCallback, useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import _, { debounce } from 'lodash'
import { type Filters } from 'src/types/filter'

export interface FiltersHook {
  isOpenFilters: boolean
  openFilters: () => void
  onCancel: () => void
  onApply: (filters: Filters) => void
  count: number
  filters: Filters
  initialFilters: any
  loading: boolean
}

export default function useFilters(
  transformToApi: (filters: any) => Filters,
  transformFromUrl: (searchParams: URLSearchParams) => Filters,
  transformToUrl: (filters: any) => string
): FiltersHook {
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filters>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [initialFilters, setInitialFilters] = useState<Filters>({})

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const filtersFromUrl = transformFromUrl(searchParams)
    setInitialFilters(filtersFromUrl)
    const transformedFilters = transformToApi(filtersFromUrl)
    setFilters(transformedFilters)
    setLoading(false)
  }, [searchParams, transformFromUrl, setInitialFilters, transformToApi, setFilters])

  const onCancel = useCallback(() => {
    setIsOpenFilters(false)
  }, [])

  const openFilters = useCallback(() => {
    setIsOpenFilters(true)
  }, [])

  const onApply = useCallback(
    debounce((filtersData: Filters) => {
      const filledFilters = _.omitBy(filtersData, (value: any) => {
        return (
          (_.isArray(value) && _.isEmpty(value)) ||
          (_.isString(value) && _.isEmpty(_.trim(value))) ||
          value === null ||
          value === undefined
        )
      })
      const apiFilters = transformToApi(filledFilters)
      setFilters(apiFilters)
      setSearchParams(transformToUrl(filtersData))
      setIsOpenFilters(false)
    }, 500),
    [setSearchParams, transformToApi, transformToUrl]
  )

  const count = useMemo(() => Object.keys(filters).length, [filters])

  return { isOpenFilters, loading, initialFilters, openFilters, onCancel, onApply, count, filters }
}
