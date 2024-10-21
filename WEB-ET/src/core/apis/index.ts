/*
 * @Date: 2024-08-03 09:54:50
 * @FilePath: /AS-WEB-3.5/src/core/apis/index.ts
 * @Description:
 */

import { merge, each, isNull, isUndefined, includes } from 'lodash'
import base from './api-base'
import user from './api-user'
import game from './api-game'

export const getURL = (key: string, params: Array<string | number>): string => {
  const apis: any = merge({ ...base }, { ...user }, { ...game })
  let result = apis[key] || null

  if (!result) {
    throw new Error(`没有找到API-KEY对应的接口地址：${key}`)
  }

  // URL 上参数的组装
  if (params.length > 0) {
    each(params, (value) => {
      result = result.replace(
        '$',
        isNull(value) || isUndefined(value) ? '' : value,
      )
    })
  }

  // 旧版接口URI需要加上client = m来实现JSON化
  if (includes(key, 'classic')) {
    result += result.indexOf('?') == -1 ? '?' : '&'
    result += 'client=m'
  }

  return `${__DEV__ ? '_api_/' : ''}${result}`
}
