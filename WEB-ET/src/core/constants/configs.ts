/*
 * @Date: 2024-07-24 15:53:47
 * @FilePath: /AS-WEB-3.5/src/core/constants/configs.ts
 * @Description:
 */
import { makeGameMenus } from '@constants/menus/gamesMenu'

// 客户端ID
export const CLIENT_ID = {
  desktop: '10000001',
  mobile: '10000002',
  APP: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
    ? '10000004'
    : '10000003',
}

// 第三方游戏菜单
export const GAME_LIST = makeGameMenus({
  games: [
    {
      cate: 'slot',
      name: 'slot',
      games: ['jili', 'pp', 'pg', 'fccc', 'jdb', 'rtg', 'bp', 'bng'],
    },
    {
      cate: 'TableGame',
      name: 'TableGame',
      games: ['jili', 'fccc', 'jdb', 'rtg', 'bp', 'pg'],
    },
    {
      cate: 'casino',
      name: 'casino',
      games: ['evo'],
    },
    {
      cate: 'fishing',
      name: 'fishing',
      games: ['jili', 'fccc', 'jdb'],
    },
    {
      cate: 'bingo',
      name: 'bingo',
      games: ['jili', 'jdb'],
    },
    {
      cate: 'gaming',
      name: 'gaming',
      games: ['ap'],
    },
  ],
})

export default {
  CLIENT_ID,
  GAME_LIST,
}
