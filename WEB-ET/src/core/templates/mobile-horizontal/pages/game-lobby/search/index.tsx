/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/security-settings/index.tsx
 * @Description:
 */
import _ from 'lodash'
import getGames from '@hooks/game/useGame'
import { useOutletContext } from 'react-router-dom'
import InputText from '@shadow/components/input-text'
import { useState } from 'react'
import { getShortPY } from '@utlis/getShortPY'
import style from './style.module.scss'

export default () => {
  const [inputValue, setInputValue] = useState('')
  interface GameContext {
    list: any[]
    count: number
    platform: string
  }
  const gameContext: GameContext = useOutletContext()
  const { getPlayUrl } = getGames()
  const currentDomain = window.location.origin
  const goplay = (item: any) => {
    getPlayUrl({
      id: item.code,
      statu: '0',
      isH5: 1,
      platform: gameContext.platform,
      playUrlId: item.id,
    })
  }
  const filterFn = (item: any) => {
    if (inputValue) {
      return getShortPY(inputValue, item.name)
    }
    return item
  }

  return (
    <div className={style['search']}>
      <div className={style['search-box']}>
        <InputText
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          placeholder="Enter search content"
          rightNode={<span className={style['check']}></span>}
        />
      </div>
      <div className={style['conter']}>
        <ul
          className={style['list']}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {gameContext.count > 0 &&
            _.filter(gameContext.list, (item: any) => filterFn(item)).map(
              (item) => (
                <li
                  className={style['wrap']}
                  onClick={() => goplay(item)}
                  key={item.code}
                >
                  <img
                    src={currentDomain + item.picture}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '6px',
                    }}
                  />
                </li>
              ),
            )}
        </ul>
      </div>
    </div>
  )
}
