/*
 * @Date: 2024-08-21 10:02:45
 * @FilePath: /AS-WEB-3.5/src/core/actions/gameAction.ts
 * @Description:
 */

import TYPES from '@constants/types'
import { IResAPI } from './types.d'

// 获取游戏列表
interface IGetGames {
  platformId?: number | string
  alias?: string
  cateName?: string
  pageSize?: number
  cateId?: number | string
  pageNo?: number
  isHot?: number
  gameType?: number | string
  cb: Function
}
export const getGames = ({
  platformId = '',
  pageSize = 12,
  cateId = '',
  pageNo = 1,
  isHot = 0,
  gameType = '',
  cb,
}: IGetGames): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/game-list',
    urlParams: [platformId, pageSize, cateId, pageNo, isHot, gameType],
    loading: true,
  },
  cb,
})

interface IGetPlayUrl {
  platform: string
  id: string
  cb: Function
  statu?: string
  loading?: boolean
  isH5?: number
}
export const getPlayUrl = ({
  platform,
  id,
  statu = '0',
  isH5 = 1,
  cb,
  loading = false,
}: IGetPlayUrl): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/gameplay-url',
    urlParams: [platform, statu, isH5, id],
    loading,
  },
  cb,
})

interface IGetGameIframe {
  platform: string
  id: string
  cb: Function
  statu?: string
  loading?: boolean
  isH5?: number
}
export const getGameIframe = ({
  platform,
  cb,
  loading = false,
}: IGetGameIframe): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/gameiframe-url',
    urlParams: [platform],
    loading,
  },
  cb,
})

interface IGetGamesStatus {
  cb?: Function
  loading?: boolean
}
export const getGamesStatus = ({
  cb,
  loading = false,
}: IGetGamesStatus): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/get-game-status',
    loading,
    cache: { expires: 5, forward: true },
  },
  cb,
})
