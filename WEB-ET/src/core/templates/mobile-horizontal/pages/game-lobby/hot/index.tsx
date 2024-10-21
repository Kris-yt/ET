/*
 * @Date: 2024-08-20 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/game-lobby/hot/index.tsx
 * @Description:
 */
import _ from 'lodash'
import getGames from '@hooks/game/useGame'
import { useOutletContext } from 'react-router-dom'
import style from './style.module.scss'

export default () => {
  interface GameContext {
    list: any[]
    count: number
    platform: string
  }
  const gameContext: GameContext = useOutletContext()
  const currentDomain = window.location.origin
  const { getPlayUrl } = getGames()

  const goplay = (item: any) => {
    getPlayUrl({
      id: item.code,
      statu: '0',
      isH5: 1,
      platform: gameContext.platform,
      playUrlId: item.id,
    })
  }

  return (
    <div className={style['conter']}>
      <ul
        className={style['list']}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {gameContext.count > 0 &&
          _.filter(gameContext.list, (item) => item.is_hot == 1).map((item) => (
            <li
              className={style['wrap']}
              onClick={() => goplay(item)}
              key={item.code}
            >
              <img
                src={currentDomain + item.picture}
                alt={item.name}
                style={{ width: '100%', height: '100%', borderRadius: '6px' }}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
