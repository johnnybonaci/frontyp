export const indicatorFromApi = (indicator: string | number | undefined): number => {
  const value = parseFloat(indicator as string)
  return isNaN(value) ? 0 : value
}

export const formatIndicator = (indicator: string | number | undefined): string => {
  const value = indicatorFromApi(indicator)
  if (value < 1000) {
    return value.toString()
  } else if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}K`
  } else {
    return `${(value / 1000000).toFixed(1)}M`
  }
}

export const formatMoneyIndicator = (indicator: string | number | undefined): string => {
  const formattedIndicator = formatIndicator(indicator)
  return `$ ${formattedIndicator}`
}

export const formatPercentageIndicator = (indicator: string | number | undefined): string => {
  const formattedIndicator = formatIndicator(indicator)
  return `${formattedIndicator} %`
}
