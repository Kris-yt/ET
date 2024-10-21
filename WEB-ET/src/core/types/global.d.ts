/*
 * @Date: 2024-07-25 12:02:51
 * @FilePath: /AS-WEB-3.5/src/core/types/global.d.ts
 * @Description:
 */
import logger from '@utlis/logger'
import cache from '@services/cache'
import GlobalValues from '@constants/global'
import eventMitt from '@services/event-mitt'
import t from '@services/i18n'
import T from '@services/i18n/$T'

declare global {
  const __DEV__: boolean
  const GlobalVar: typeof GlobalValues
  const Logger: typeof logger
  const Store: typeof cache
  const Emitter: typeof eventMitt
  const $t: typeof t
  const $T: typeof T
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    __DEV__: boolean
    __TRANS_OUTPUT__: string[]
    __orientation: 'landscape' | 'portrait'
  }
}
