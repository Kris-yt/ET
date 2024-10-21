/*
 * @Date: 2024-08-02 15:30:30
 * @FilePath: /AS-WEB-3.5/src/core/services/cache/localStorage.ts
 * @Description:
 */
import type { TLocalStorageKeys, TLocalStorageValues } from './types'

const get = (key: string) => {
  if (!localStorage) {
    return null
  }
  const item = localStorage.getItem(key)
  if (!item) {
    return null
  }
  const cache = JSON.parse(item)
  if (Date.now() > Number(cache.expires)) {
    Logger.info(`Cache ${key} expired`)
    localStorage.removeItem(key)
    return null
  }
  return cache.data
}

const set = (key: string, value: any, expires?: number) => {
  if (!localStorage) {
    return
  }
  // 默认设置永久
  const expiresTime = Date.now() + (expires || 3600 * 24 * 30 * 12) * 1000
  localStorage.setItem(
    key,
    JSON.stringify({ data: value, expires: expiresTime }),
  )
}

const remove = (key: string) => {
  if (!localStorage) {
    return
  }
  localStorage.removeItem(key)
}

const clear = () => {
  if (!localStorage) {
    return
  }
  for (let i = 0; i < localStorage.length; i++) {
    // 不清除白名单
    const wihteList: string[] = []
    const key = localStorage.key(i)
    if (key && !wihteList.includes(key)) {
      remove(key)
    }
  }
}

const initialize = () => {
  if (!localStorage) {
    return
  }
}

export default {
  get: <T extends TLocalStorageKeys>(key: T): TLocalStorageValues<T> =>
    get(key),
  set: <T extends TLocalStorageKeys>(
    key: T,
    value: TLocalStorageValues<T>,
    expires?: number,
  ) => set(key, value, expires),
  getRaw: get,
  setRaw: set,
  remove: (key: TLocalStorageKeys) => remove(key),
  clear,
  initialize,
}
