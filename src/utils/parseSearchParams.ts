export function decodeSearchParams(params: URLSearchParams): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of params.entries()) {
    try {
      const parsedValue = JSON.parse(decodeURIComponent(value))
      result[key] = parsedValue
    } catch (error) {
      result[key] = value
    }
  }

  return result
}

export function encodeSearchParams(params: Record<string, any>): URLSearchParams {
  const result = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    result.set(key, encodeURIComponent(JSON.stringify(value)))
  }

  return result
}
