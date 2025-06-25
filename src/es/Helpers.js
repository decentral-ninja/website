/* global self */

const hexColorMap = new Map()
export const getHexColor = async (string) => hexColorMap.has(string)
  ? hexColorMap.get(string)
  : hexColorMap.set(string, `#${Array.from(new Uint8Array(await self.crypto.subtle.digest('SHA-256', new TextEncoder().encode(string)))).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 6)}`).get(string)

export const jsonStringifyMapUrlReplacer = (key, value) => {
  if(value instanceof Map) return {
    dataType: 'Map',
    value: Array.from(value)
  }
  if(value instanceof URL) return {
    dataType: 'URL',
    value: value.href
  }
  return value
}

export const jsonParseMapUrlReviver = (key, value) => {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') return new Map(value.value)
    if(value.dataType === 'URL') return new URL(value.value)
  }
  return value
}
