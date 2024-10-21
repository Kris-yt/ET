/*
 * @Date: 2024-08-02 15:18:39
 * @FilePath: /AS-WEB-3.5/src/core/services/cache/types.d.ts
 * @Description:
 */
export type TSessionStorageObj = {}

export type TLocalStorageObj = {
  auth: string
  sessionId: string
  userProfile: any
  useLimit: boolean
  numberlist: Array
  loadmin: string
  loadmax: string
  paymentlist: Array
  bid: string
}

export type TSessionStorageKeys = keyof TSessionStorageObj
export type TSessionStorageValues<K extends TSessionStorageKeys> =
  TSessionStorageObj[K]

export type TLocalStorageKeys = keyof TLocalStorageObj
export type TLocalStorageValues<K extends TLocalStorageKeys> =
  TLocalStorageObj[K]
