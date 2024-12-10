export const indicatorFromApi = (indicator: string | number | undefined): number => {
  const value = parseFloat(indicator as string)
  return isNaN(value) ? 0 : value
}

const plainNumber = (number: string | number, toInt: boolean = false): number | string | null => {
  if (number) {
    const value = number.toString().split('.').join('')

    if (toInt) {
      return parseInt(value, 10)
    }

    return value
  }

  return null
}

const reverseNumber = (input: string): string => {
  return input.split('').reverse().join('')
}

export const addDots = (value: string | number): string => {
  if (!value) {
    return '0'
  }

  const plain = plainNumber(value.toString())
  const reversed = reverseNumber(plain as string)
  const reversedWithDots = reversed.match(/.{1,3}/g)?.join('.') ?? ''

  return reverseNumber(reversedWithDots)
}

export const formatIndicator = (indicator: string | number | undefined): string => {
  return indicatorFromApi(indicator).toString()
}

export const formatMoneyIndicator = (indicator: string | number | undefined): string => {
  const value = indicatorFromApi(indicator)
  let formattedIndicator
  if (value < 1000) {
    formattedIndicator = value.toString()
  } else if (value < 1000000) {
    formattedIndicator = `${(value / 1000).toFixed(1)}K`
  } else {
    formattedIndicator = `${(value / 1000000).toFixed(1)}M`
  }

  return `$ ${formattedIndicator}`
}

export const formatPercentageIndicator = (indicator: string | number | undefined): string => {
  const formattedIndicator = formatIndicator(indicator)
  return `${formattedIndicator} %`
}
