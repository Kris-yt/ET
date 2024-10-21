/*
 * @Date: 2024-08-02 09:53:43
 * @FilePath: /AS-WEB-3.5/src/core/constants/global.ts
 * @Description:
 */

import type { TGlobalKeys, TGlobalValues } from './global.d'

const get = <T extends TGlobalKeys>(key: T): TGlobalValues<T> =>
  window['__GlobalValues__'][key]

const set = <T extends TGlobalKeys>(key: T, value: TGlobalValues<T>) => {
  window['__GlobalValues__'][key] = value
}

const initialize = () => {
  window['__GlobalValues__'] = window['__GlobalValues__'] || {
    LANGUAGE: 'en-US',
  }
}

export default {
  get,
  set,
  initialize,
}
