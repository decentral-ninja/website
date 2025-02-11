/* global self */

const hexColorMap = new Map()
export const getHexColor = async (string) => hexColorMap.has(string)
  ? hexColorMap.get(string)
  : hexColorMap.set(string, `#${Array.from(new Uint8Array(await self.crypto.subtle.digest('SHA-256', new TextEncoder().encode(string)))).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 6)}`).get(string)