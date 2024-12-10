import { useState, useCallback, useMemo, useEffect } from 'react'

export interface ColumnSettings {
  header: string
  fieldName: string
  sortable: boolean
}

export interface IndicatorSettings {
  type?: string
  fieldName: string
  name: string
  value: any
  growthPercentage?: number
}

export interface DoubleIndicatorSettings {
  type: string
  fieldName: string
  name: string
  values: { name: string; value: string }[]
  growthPercentage?: number
}

const useTableSettings = (
  initialColumns: ColumnSettings[],
  initialIndicators: (IndicatorSettings | DoubleIndicatorSettings)[],
  key: string
): {
  columns: ColumnSettings[]
  indicators: (IndicatorSettings | DoubleIndicatorSettings)[]
  visibleColumns: ColumnSettings[]
  visibleIndicators: (IndicatorSettings | DoubleIndicatorSettings)[]
  notVisibleColumns: ColumnSettings[]
  notVisibleIndicators: (IndicatorSettings | DoubleIndicatorSettings)[]
  reorderColumns: (sourceIndex: number, destinationIndex: number) => void
  reorderIndicators: (sourceIndex: number, destinationIndex: number) => void
  toggleColumnVisibility: (fieldName: string) => void
  toggleIndicatorVisibility: (name: string) => void
  resetToDefaultSettings: () => void
} => {
  const storageKey = key + '-settings'
  const getLocalStorageSettings = (
    key: string
  ): {
    columnVisibility: Record<string, boolean>
    indicatorVisibility: Record<string, boolean>
    orderedColumns: string[]
    orderedIndicators: string[]
  } => {
    const storedData = localStorage.getItem(key)
    return storedData
      ? JSON.parse(storedData)
      : {
          columnVisibility: Object.fromEntries(
            initialColumns.map((column) => [column.fieldName, true])
          ),
          indicatorVisibility: Object.fromEntries(
            initialIndicators.map((indicator) => [indicator.name, true])
          ),
          orderedColumns: initialColumns.map((column) => column.fieldName),
          orderedIndicators: initialIndicators.map((indicator) => indicator.name),
        }
  }

  const [columns, setColumns] = useState<ColumnSettings[]>(initialColumns)
  const [indicators, setIndicators] =
    useState<(IndicatorSettings | DoubleIndicatorSettings)[]>(initialIndicators)

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    getLocalStorageSettings(storageKey)?.columnVisibility ?? {}
  )
  const [indicatorVisibility, setIndicatorVisibility] = useState<Record<string, boolean>>(
    getLocalStorageSettings(storageKey)?.indicatorVisibility ?? {}
  )

  const [orderedColumnKeys, setOrderedColumnKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.orderedColumns.length > 0
      ? getLocalStorageSettings(storageKey)?.orderedColumns
      : initialColumns.map((col) => col.fieldName)
  )

  const [orderedIndicatorKeys, setOrderedIndicatorKeys] = useState<string[]>(
    getLocalStorageSettings(storageKey)?.orderedIndicators.length > 0
      ? getLocalStorageSettings(storageKey)?.orderedIndicators
      : initialIndicators.map((ind) => ind.name)
  )

  const resetToDefaultSettings = useCallback(() => {
    setColumns(initialColumns)
    setIndicators(initialIndicators)

    setColumnVisibility(
      Object.fromEntries(initialColumns.map((column) => [column.fieldName, true]))
    )
    setIndicatorVisibility(
      Object.fromEntries(initialIndicators.map((indicator) => [indicator.name, true]))
    )

    setOrderedColumnKeys(initialColumns.map((col) => col.fieldName))
    setOrderedIndicatorKeys(initialIndicators.map((ind) => ind.name))
  }, [initialColumns, initialIndicators])

  useEffect(() => {
    const settingsState = {
      columnVisibility,
      indicatorVisibility,
      orderedColumns: orderedColumnKeys,
      orderedIndicators: orderedIndicatorKeys,
    }
    localStorage.setItem(storageKey, JSON.stringify(settingsState))
  }, [columnVisibility, indicatorVisibility, orderedColumnKeys, orderedIndicatorKeys])

  useEffect(() => {
    const localSettings = getLocalStorageSettings(storageKey)
    const columnKeys = initialColumns.map((col) => col.fieldName)
    const indicatorKeys = initialIndicators.map((ind) => ind.name)

    const hasColumnMismatch =
      columnKeys.length !== localSettings.orderedColumns.length ||
      !columnKeys.every((key) => localSettings.orderedColumns.includes(key))

    const hasIndicatorMismatch =
      indicatorKeys.length !== localSettings.orderedIndicators.length ||
      !indicatorKeys.every((key) => localSettings.orderedIndicators.includes(key))

    if (hasColumnMismatch || hasIndicatorMismatch) {
      resetToDefaultSettings()
    }
  }, [initialColumns, initialIndicators, resetToDefaultSettings, storageKey])

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
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: !prevVisibility[fieldName],
    }))
  }, [])

  const toggleIndicatorVisibility = useCallback((name: string) => {
    setIndicatorVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: !prevVisibility[name],
    }))
  }, [])

  const visibleColumns = useMemo(
    () =>
      orderedColumnKeys
        .filter((key) => columnVisibility[key])
        .map((key) => columns.find((col) => col.fieldName === key) as ColumnSettings),
    [columns, columnVisibility, orderedColumnKeys]
  )

  const notVisibleColumns = useMemo(
    () =>
      orderedColumnKeys
        .filter((key) => !columnVisibility[key])
        .map((key) => columns.find((col) => col.fieldName === key) as ColumnSettings),
    [columns, columnVisibility, orderedColumnKeys]
  )

  const visibleIndicators = useMemo(
    () =>
      orderedIndicatorKeys
        .filter((key) => indicatorVisibility[key])
        .map((key) => indicators.find((ind) => ind.name === key) as IndicatorSettings),
    [indicators, indicatorVisibility, orderedIndicatorKeys]
  )

  const notVisibleIndicators = useMemo(
    () =>
      orderedIndicatorKeys
        .filter((key) => !indicatorVisibility[key])
        .map((key) => indicators.find((ind) => ind.name === key) as IndicatorSettings),
    [indicators, indicatorVisibility, orderedIndicatorKeys]
  )

  useEffect(() => {
    if (JSON.stringify(initialIndicators) !== JSON.stringify(indicators)) {
      setIndicators(initialIndicators)
    }
  }, [indicators, initialIndicators])

  return {
    columns: orderedColumnKeys
      .map((key) => columns.find((col) => col.fieldName === key))
      .filter((col): col is ColumnSettings => col !== undefined),
    indicators: orderedIndicatorKeys.map(
      (key) => indicators.find((ind) => ind.name === key) as IndicatorSettings
    ),
    visibleColumns: visibleColumns.filter((col) => col !== undefined),
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
