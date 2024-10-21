/*
 * @Date: 2024-08-21 10:50:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/game/useGame.ts
 * @Description:
 */
import _ from 'lodash'
import { useState } from 'react'
import useGlobal from '../useGlobal'
import { useNavigate } from 'react-router-dom'
import { GAMES } from '@constants/menus/gamesMenu'
export default () => {
  const navigate = useNavigate()
  const { dispatch, ACTIONS } = useGlobal()
  const [gameList, setGameList] = useState<any>([])
  const [gameStatus, setGameStatus] = useState<any>()
  //获取游戏列表
  const getGameList = ({
    pageSize = 12,
    pageNo,
    cateId,
    isHot = 0,
    platform,
    gameType,
  }) => {
    dispatch(
      ACTIONS.GAME.getGames({
        pageSize,
        pageNo,
        cateId,
        isHot,
        platformId: GAMES[platform]?.id,
        gameType,
        cb: (res: any) => {
          setGameList(_.merge(res.data, { platform: platform }))
        },
      }),
    )
  }

  // 获取实际游玩地址
  const getPlayUrl = ({
    id,
    statu = '0',
    isH5 = 1,
    loading = false,
    platform,
    playUrlId,
  }) => {
    if (GAMES[platform].playurl) {
      window.open(GAMES[platform].playurl + playUrlId)
      return
    }
    dispatch(
      ACTIONS.GAME.getPlayUrl({
        platform: platform,
        id,
        statu,
        isH5,
        loading,
        cb: (res: any) => {
          if (!res.data.url || res.data.url == '') {
            navigate('/home')
            dispatch(
              ACTIONS.BASE.openToast({
                type: 'error',
                text: $t('场馆正在维护中'),
              }),
            )
            return
          }
          if (res.status == 10000) {
            window.open(res.data.url)
            return
          }
        },
      }),
    )
  }

  // 获取游戏可用性状态
  const getGamesStatus = () => {
    dispatch(
      ACTIONS.GAME.getGamesStatus({
        cb: (res: any) => {
          if (res.status == 10000) {
            setGameStatus(res.data)
          }
        },
      }),
    )
  }

  return {
    gameList,
    getGameList,
    getPlayUrl,
    gameStatus,
    getGamesStatus,
  }
}
