import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { decodeSearchParams, encodeSearchParams } from 'src/utils/parseSearchParams'
import clearObject from 'src/utils/clearObject'
import { Filters } from 'types/filter'

export type Filter = Record<string, any>

interface FiltersReturnType {
  isOpenFilters: boolean
  openFilters: () => void
  onCancel: () => void
  onApply: (filters: any) => void
  count: number
  filters: any
  filtersToAPI: any
  onClear: () => void
}

type TransformerToAPI = (filters: Filters) => Record<string, any>
type TransformerFromURL = (searchParams: URLSearchParams) => Filters

const defaultTransformFromUrl = (searchParams: URLSearchParams): Filters => {
  return clearObject(decodeSearchParams(searchParams))
}

const defaultTransformToUrl = (filters: Filters): URLSearchParams => {
  return encodeSearchParams(clearObject(filters))
}

export default function useFilters(
  transformerToAPI: TransformerToAPI,
  transfomerFromURL: TransformerFromURL = defaultTransformFromUrl,
  initialValues: any = {},
  skipFilterFromCount: string[] = []
): FiltersReturnType {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const filtersFromURL = useMemo(() => transfomerFromURL(searchParams), [])
  const [filters, setFilters] = useState({
    ...initialValues,
    ...filtersFromURL,
  })

  const onCancel = useCallback(() => {
    setIsOpenFilters(false)
  }, [])
  const openFilters = useCallback(() => {
    setIsOpenFilters(true)
  }, [])

  const onApply = useCallback(
    (filters: any) => {
      setSearchParams(defaultTransformToUrl(filters))
      setFilters(filters)
      setIsOpenFilters(false)
    },
    [setSearchParams]
  )

  const count = useMemo(
    () =>
      Object.keys(clearObject(filters)).filter(
        (key) => ![...skipFilterFromCount, 'perPage', 'page'].includes(key)
      ).length,
    [filters, skipFilterFromCount]
  )

  const filtersToAPI = useMemo(() => {
    if (!transformerToAPI || Object.keys(filters).length === 0) return filters

    return clearObject(transformerToAPI(filters))
  }, [filters])

  const onClear = useCallback(() => {
    setSearchParams('')
    setFilters(initialValues)
    setIsOpenFilters(false)
  }, [])

  return {
    isOpenFilters,
    openFilters,
    onCancel,
    onApply,
    count,
    filters,
    filtersToAPI,
    onClear,
  }
}
