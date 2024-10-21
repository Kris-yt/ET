/*
 * @Date: 2024-08-20 15:05:05
 * @FilePath: src\core\constants\menus\gamesMenu.ts
 * @Description: 第三方游戏菜单
 */

import _ from 'lodash'

export const OPEN_TYPE = {
  LOBBY: 'LOBBY', // 游戏大厅
  LOBBYURL: 'LOBBYURL', // 带游戏大厅ID固定URL
  IFRAME: 'IFRAME', // 游戏iframe
  FIXEDURL: 'FIXEDURL', // 游戏iframe固定URL
}

export const GAMES: any = {
  ['jili']: {
    id: 45,
    name: 'JILI',
    alias: 'jili',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      TableGame: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      fishing: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      bingo: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['ap']: {
    name: 'AP',
    alias: 'ap',
    forward: {
      gaming: {
        openType: OPEN_TYPE.IFRAME,
      },
    },
  },
  ['bp']: {
    id: 48,
    name: 'BP',
    alias: 'bp',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      TableGame: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['fccc']: {
    id: 46,
    name: 'FCCC',
    alias: 'fccc',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      TableGame: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      fishing: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['pp']: {
    id: 34,
    name: 'PP',
    alias: 'pp',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['pg']: {
    id: 19,
    name: 'PG',
    alias: 'pg',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['jdb']: {
    id: 18,
    name: 'JDB',
    alias: 'jdb',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      TableGame: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      fishing: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      bingo: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['rtg']: {
    id: 51,
    name: 'RTG',
    alias: 'rtg',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
      TableGame: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['bng']: {
    id: 50,
    name: 'BNG',
    alias: 'bng',
    forward: {
      slot: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
  ['evo']: {
    id: 49,
    name: 'EVO',
    alias: 'evo',
    forward: {
      casino: {
        route: '/gamelobby/all',
        openType: OPEN_TYPE.LOBBY,
      },
    },
  },
}

interface IGames {
  games: any
  gameMenus?: any
}
export const makeGameMenus = ({ games, gameMenus = GAMES }: IGames) => {
  const result: any = []
  _.each(games, (item: any) => {
    result.push({
      ...item,
      games: _.map(item.games, (it) => ({
        ...gameMenus[it],
        cate: item.cate,
        cateName: item.name,
      })),
    })
  })
  return result
}
