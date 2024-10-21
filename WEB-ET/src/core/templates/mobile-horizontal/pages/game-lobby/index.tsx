/*
 * @Date: 2024-08-20 11:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/game-lobby/index.tsx
 * @Description:
 */

import _ from 'lodash'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PanelButton from '@shadow/components/panel/button'
import Panel, {
  PanelMiniBoard,
  PanelMenus,
} from '@shadow/components/panel/index'
import { pages } from './const'
import getGames from '@hooks/game/useGame'
import style from './style.module.scss'

export default () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const { state } = useLocation()
  // 默认选中第一个页面
  const defaultPath = pages[0]?.location || '/'
  const [current, setCurrent] = React.useState(location)
  const { getGameList, gameList } = getGames()
  const [titleCate, setTitleCate] = React.useState('')
  React.useEffect(() => {
    // 如果路径是 '/gamelobby'，默认选择第一个子页面
    if (location === '/gamelobby') {
      navigate(defaultPath)
      setCurrent(defaultPath)
    } else {
      setCurrent(location)
    }
  }, [location, navigate, defaultPath])

  React.useEffect(() => {
    if (!state) return
    getGameList({
      pageSize: 300,
      pageNo: 1,
      cateId: '',
      isHot: 0,
      platform: _.toLower(state.gameName),
      gameType: getGameType[state.cate],
    })
    setTitleCate(state.cate)
  }, [])

  return (
    <Panel type="page" title={titleCate} display isShowBack>
      <PanelMenus>
        {pages.map((page, index) => (
          <PanelButton
            key={index}
            state={current === page.location ? 'checked' : 'unchecked'}
            onClick={() => {
              navigate(page.location)
              setCurrent(page.location)
            }}
          >
            <div className={style[page.style]}>
              <span>{page.title}</span>
            </div>
          </PanelButton>
        ))}
      </PanelMenus>
      <PanelMiniBoard>
        <Outlet context={gameList} />
      </PanelMiniBoard>
    </Panel>
  )
}

const getGameType = {
  ['slot']: 1,
  ['TableGame']: 2,
  ['casino']: 3,
  ['fishing']: 4,
  ['bingo']: 5,
  ['sports']: 6,
  ['numeric games']: 7,
}
