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
  const reversedWithDots = reversed.match(/.{1,3}/g)?.join('.') || ''

  return reverseNumber(reversedWithDots)
}

const formatMoney = (value: string | number, defaultValue: string = '-'): string => {
  if (value) {
    const integerValue = parseInt(value.toString(), 10)
    if (integerValue >= 0) {
      return `$ ${addDots(value)}`
    }

    return `- $ ${addDots(integerValue * -1)}`
  }

  return defaultValue
}

export default formatMoney
