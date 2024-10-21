/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/home/navigation/index.tsx
 * @Description:
 */
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '@base-ui/components/background'
import style from './style.module.scss'
import { ComponentItemProps, ListItemProps } from './types'
import useGlobal from '@/core/hooks/useGlobal'
import { categoryList, gameList } from './const'
import CONFIG from '@/core/constants/configs'
import useGameIframe from '@/core/hooks/game/useGameIframe'
import useAuth from '@/core/hooks/useAuth'
import useGame from '@/core/hooks/game/useGame'
export default () => {
  const [activeCategoryName, setActiveCategoryName] = useState<string>('slot')
  const { getGamesStatus, gameStatus } = useGame()
  useEffect(() => {
    getGamesStatus()
  }, [])

  return (
    <>
      <Background
        className={style['navigation']}
        tag={'div'}
        src={require('./i/navigation-bg.png?format=webp')}
      >
        {categoryList.map(({ categoryName }: ListItemProps) => (
          <NavigationItem
            key={categoryName}
            categoryName={categoryName}
            isActive={activeCategoryName === categoryName}
            onChangeTabs={() => {
              setActiveCategoryName(categoryName)
            }}
          />
        ))}
      </Background>
      <GameBox
        gameList={gameList[activeCategoryName]}
        gameStatus={gameStatus}
      />
    </>
  )
}

const NavigationItem = ({
  categoryName,
  isActive = false,
  onChangeTabs,
}: ComponentItemProps) => {
  const camelToSpaced = (camelCaseString: string) => {
    const newArr = camelCaseString
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .split(' ')
    const newStr = newArr
      .map((i) => i.replace(/\b[a-z]/g, (match) => match.toUpperCase()))
      .join(' ')
    return newStr
  }

  return (
    <>
      <div
        className={`${style['nav-item']} ${style[categoryName]}`}
        onClick={onChangeTabs}
      >
        <i
          className={`${style['ic-format']} ${style[`ic-${categoryName}`]}`}
        ></i>
        <span>{camelToSpaced(categoryName)}</span>
        {isActive && (
          <i
            className={`${style['active-format']} ${style[`active-${categoryName}`]}`}
          ></i>
        )}
      </div>
    </>
  )
}

const GameBox = ({
  gameList,
  gameStatus,
}: {
  gameList: any
  gameStatus: any
}) => {
  const { dispatch, ACTIONS } = useGlobal()
  const navigate = useNavigate()
  const { getGameIframe } = useGameIframe()
  //处理强制kyc跳转
  const { checkKYCVerifeid } = useAuth()
  const newGameList = _.chain(gameList)
    .map((game) => ({
      ...game,
      st: _.filter(gameStatus, { alias: _.toLower(game.gameName) }),
    }))
    .value()
  const handleOpenGames = (item: any) => {
    if (item.st[0]?.status == 0) {
      return
    }
    const game = _.chain(CONFIG.GAME_LIST)
      .filter((i) => i.cate == item.cate)
      .map('games')
      .flatten()
      .filter((i) => i.name == item.gameName)
      .value()
    //暂时屏蔽未对接场馆跳转
    if (game.length == 0) {
      dispatch(
        ACTIONS.BASE.openToast({
          text: '此版本该游戏暂未开放',
          type: 'info',
        }),
      )
      return
    }
    if (
      _.includes(['LOBBY', 'LOBBYURL'], game[0].forward[item.cate].openType)
    ) {
      navigate(game[0].forward[item.cate].route, { state: item })
      return
    }
    if (_.includes(game[0].forward[item.cate].openType, 'IFRAME')) {
      getGameIframe({ platform: _.toLower(item.gameName) })
      return
    }
    if (_.includes(game[0].forward[item.cate].openType, 'FIXEDURL')) {
      navigate('/gamelobby/iframe', { state: game[0].forward[item.cate].route })
      return
    }
  }

  return (
    <div
      className={style['game-list']}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {newGameList &&
        newGameList.map((item, index) => (
          <div className={style['center']} key={index}>
            <img
              src={item.imageUrl}
              alt="game"
              key={index}
              style={{ display: item.st[0]?.status == 2 ? 'none' : 'unset' }}
              onClick={checkKYCVerifeid(() => handleOpenGames(item))}
            />
            {item.st[0]?.status == 0 && (
              <div className={style['maintain']}>
                <p>Maintenance</p>
                <p>From</p>
                <p>{item.st[0]?.maintenance_start}</p>
                <p>to</p>
                <p>{item.st[0]?.maintenance_end}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
