/*
 * @Date: 2024-08-02 15:18:08
 * @FilePath: /AS-WEB-3.5/src/core/services/cache/sessionStorage.ts
 * @Description:
 */
import type { TSessionStorageKeys, TSessionStorageValues } from './types'

const get = (key: string) => {
  if (!sessionStorage) {
    return null
  }
  const item = sessionStorage.getItem(key)
  if (!item) {
    return null
  }
  const cache = JSON.parse(item)
  return cache.data
}

const set = (key: string, value: any) => {
  if (!sessionStorage) {
    return
  }
  sessionStorage.setItem(key, JSON.stringify({ data: value }))
}

const remove = (key: string) => {
  if (!sessionStorage) {
    return
  }
  sessionStorage.removeItem(key)
}

const clear = () => {
  if (!sessionStorage) {
    return
  }
  sessionStorage.clear()
}

const initialize = () => {
  if (!sessionStorage) {
    return
  }
}

export default {
  get: <T extends TSessionStorageKeys>(key: T): TSessionStorageValues<T> =>
    get(key),
  set: <T extends TSessionStorageKeys>(
    key: T,
    value: TSessionStorageValues<T>,
  ) => set(key, value),
  getRaw: get,
  setRaw: set,
  remove: (key: TSessionStorageKeys) => remove(key),
  clear,
  initialize,
}
