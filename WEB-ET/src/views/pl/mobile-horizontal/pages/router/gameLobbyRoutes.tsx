/*
 * @Date: 2024-08-21 16:56:15
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/gameLobbyRoutes.tsx
 * @Description:
 */
import GameLobby from '@shadow/pages/game-lobby/index'
import All from '@shadow/pages/game-lobby/all/index'
import Hot from '@shadow/pages/game-lobby/hot/index'
import Search from '@shadow/pages/game-lobby/search/index'
import GameIframe from '@shadow/pages/game-iframe/index'

export const gameLobbyRoutes = [
  {
    path: 'gamelobby',
    element: <GameLobby />,
    needLogin: true,
    children: [
      { path: 'all', element: <All /> },
      { path: 'hot', element: <Hot /> },
      { path: 'search', element: <Search /> },
      { path: 'iframe', element: <GameIframe /> },
    ],
  },
]
