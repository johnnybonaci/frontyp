import { useState, useCallback, useMemo, useEffect } from 'react'

export interface ColumnSettings {
  header: string
  fieldName: string
  sortable: boolean
}

export interface IndicatorSettings {
  fieldName: string
  name: string
  value: string
  growthPercentage?: number
}

const useTableSettings = (
  initialColumns: ColumnSettings[],
  initialIndicators: IndicatorSettings[],
  storageKey: string
): {
  columns: ColumnSettings[]
  indicators: IndicatorSettings[]
  visibleColumns: ColumnSettings[]
  visibleIndicators: IndicatorSettings[]
  notVisibleColumns: ColumnSettings[]
  notVisibleIndicators: IndicatorSettings[]
  reorderColumns: (sourceIndex: number, destinationIndex: number) => void
  reorderIndicators: (sourceIndex: number, destinationIndex: number) => void
  toggleColumnVisibility: (fieldName: string) => void
  toggleIndicatorVisibility: (name: string) => void
  resetToDefaultSettings: () => void
} => {
  const getLocalStorageSettings = (
    key: string
  ): {
    visibleColumns: string[]
    visibleIndicators: string[]
    orderedColumns: string[]
    orderedIndicators: string[]
  } => {
    const storedData = localStorage.getItem(key)
    return storedData
      ? JSON.parse(storedData)
      : {
          visibleColumns: initialColumns.map((column) => column.fieldName),
          visibleIndicators: initialIndicators.map((indicator) => indicator.name),
          orderedColumns: initialColumns.map((column) => column.fieldName),
          orderedIndicators: initialIndicators.map((indicator) => indicator.name),
        }
  }

  const [columns, setColumns] = useState<ColumnSettings[]>(initialColumns)
  const [indicators, setIndicators] = useState<IndicatorSettings[]>(initialIndicators)

  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.visibleColumns ?? []
  )
  const [visibleIndicatorKeys, setVisibleIndicatorKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.visibleIndicators ?? []
  )

  const [orderedColumnKeys, setOrderedColumnKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.orderedColumns.length > 0
      ? getLocalStorageSettings(storageKey)?.orderedColumns
      : initialColumns.map((col) => col.fieldName)
  )

  const resetToDefaultSettings = () => {
    setColumns(initialColumns)
    setIndicators(initialIndicators)

    setVisibleColumnKeys(initialColumns.map((column) => column.fieldName))
    setVisibleIndicatorKeys(initialIndicators.map((indicator) => indicator.name))

    setOrderedColumnKeys(initialColumns.map((col) => col.fieldName))
    setOrderedIndicatorKeys(initialIndicators.map((ind) => ind.name))
  }

  const [orderedIndicatorKeys, setOrderedIndicatorKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.orderedIndicators.length > 0
      ? getLocalStorageSettings(storageKey)?.orderedIndicators
      : initialIndicators.map((ind) => ind.name)
  )

  useEffect(() => {
    const settingsState = {
      visibleColumns: visibleColumnKeys,
      visibleIndicators: visibleIndicatorKeys,
      orderedColumns: orderedColumnKeys,
      orderedIndicators: orderedIndicatorKeys,
    }
    localStorage.setItem(storageKey, JSON.stringify(settingsState))
  }, [visibleColumnKeys, visibleIndicatorKeys, orderedColumnKeys, orderedIndicatorKeys])

  const reorderColumns = useCallback((sourceIndex: number, destinationIndex: number) => {
    setOrderedColumnKeys((prevOrderedKeys) => {
      const reorderedKeys = [...prevOrderedKeys]
      const [movedKey] = reorderedKeys.splice(sourceIndex, 1)
      reorderedKeys.splice(destinationIndex, 0, movedKey)
      return reorderedKeys
    })
  }, [])

  const reorderIndicators = useCallback((sourceIndex: number, destinationIndex: number) => {
    setOrderedIndicatorKeys((prevOrderedKeys) => {
      const reorderedKeys = [...prevOrderedKeys]
      const [movedKey] = reorderedKeys.splice(sourceIndex, 1)
      reorderedKeys.splice(destinationIndex, 0, movedKey)
      return reorderedKeys
    })
  }, [])

  const toggleColumnVisibility = useCallback((fieldName: string) => {
    setVisibleColumnKeys(
      (prevKeys) =>
        prevKeys.includes(fieldName)
          ? prevKeys.filter((key) => key !== fieldName) // Ocultar
          : [...prevKeys, fieldName] // Mostrar
    )
  }, [])

  const toggleIndicatorVisibility = useCallback((name: string) => {
    setVisibleIndicatorKeys(
      (prevKeys) =>
        prevKeys.includes(name)
          ? prevKeys.filter((key) => key !== name) // Ocultar
          : [...prevKeys, name] // Mostrar
    )
  }, [])

  const visibleColumns = useMemo(
    () =>
      orderedColumnKeys
        .filter((key) => visibleColumnKeys.includes(key))
        .map((key) => columns.find((col) => col.fieldName === key) as ColumnSettings),
    [columns, visibleColumnKeys, orderedColumnKeys]
  )

  const notVisibleColumns = useMemo(
    () =>
      orderedColumnKeys
        .filter((key) => !visibleColumnKeys.includes(key))
        .map((key) => columns.find((col) => col.fieldName === key) as ColumnSettings),
    [columns, visibleColumnKeys, orderedColumnKeys]
  )

  const visibleIndicators = useMemo(
    () =>
      orderedIndicatorKeys
        .filter((key) => visibleIndicatorKeys.includes(key))
        .map((key) => indicators.find((ind) => ind.name === key) as IndicatorSettings),
    [indicators, visibleIndicatorKeys, orderedIndicatorKeys]
  )

  const notVisibleIndicators = useMemo(
    () =>
      orderedIndicatorKeys
        .filter((key) => !visibleIndicatorKeys.includes(key))
        .map((key) => indicators.find((ind) => ind.name === key) as IndicatorSettings),
    [indicators, visibleIndicatorKeys, orderedIndicatorKeys]
  )

  useEffect(() => {
    if (JSON.stringify(initialIndicators) !== JSON.stringify(indicators)) {
      setIndicators(initialIndicators)
    }
  }, [indicators, initialIndicators])

  return {
    columns: orderedColumnKeys.map(
      (key) => columns.find((col) => col.fieldName === key) as ColumnSettings
    ),
    indicators: orderedIndicatorKeys.map(
      (key) => indicators.find((ind) => ind.name === key) as IndicatorSettings
    ),
    visibleColumns,
    visibleIndicators,
    notVisibleColumns,
    notVisibleIndicators,
    reorderColumns,
    reorderIndicators,
    toggleColumnVisibility,
    toggleIndicatorVisibility,
    resetToDefaultSettings,
  }
}

export default useTableSettings
