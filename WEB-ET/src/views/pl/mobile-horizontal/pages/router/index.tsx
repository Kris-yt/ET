/*
 * @Date: 2024-08-21 19:38:33
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/index.tsx
 * @Description:
 */
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import usePreviousRoute from '@hooks/usePreviousRoute'
import useEventEmitter from '@hooks/useEventEmitter'
import { useNavigate } from 'react-router-dom'
import { homeRoutes } from './homeRoutes'
import { userRoutes } from './userRoutes'
import { miscRoutes } from './miscRoutes'
import { walletRoutes } from './walletRoutes'
import { accountRoutes } from './accountRoutes'
import { gameLobbyRoutes } from './gameLobbyRoutes'
import NotFound from '@shadow/pages/403'
import ProtectedRoute from './PrivateRoute'
import Home from '../../shadow/pages/home'

const AppRoutes = () => {
  return (
    <Router>
      <RouteWithSubRoutes />
    </Router>
  )
}

export default AppRoutes

const RouteWithSubRoutes = () => {
  usePreviousRoute()
  const navigate = useNavigate()
  useEventEmitter('navigate', (path: string) => {
    navigate(path)
  })

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.needLogin ? (
                <ProtectedRoute element={route.element} />
              ) : (
                route.element
              )
            }
          >
            {renderRoutes(route.children)}
          </Route>
        )
      } else {
        return <Route key={index} path={route.path} element={route.element} />
      }
    })
  }

  const routes = [
    { path: '/', element: <Home /> },
    ...homeRoutes,
    ...userRoutes,
    ...miscRoutes,
    ...walletRoutes,
    ...accountRoutes,
    ...gameLobbyRoutes,
    { path: '*', element: <NotFound /> },
  ]

  return <Routes>{renderRoutes(routes)}</Routes>
}
