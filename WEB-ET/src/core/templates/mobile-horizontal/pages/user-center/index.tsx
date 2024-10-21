/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/user-center/index.tsx
 * @Description:
 */
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PanelButton from '@shadow/components/panel/button'
import Panel, {
  PanelMiniBoard,
  PanelMenus,
} from '@shadow/components/panel/index'
import { pages } from './const'

export default () => {
  const navigate = useNavigate()
  const pathName = useLocation().pathname
  const [current, setCurrent] = React.useState(pathName)

  React.useEffect(() => {
    setCurrent(pathName)
  }, [pathName])

  return (
    <>
      <Panel
        type="page"
        title={$t('个人中心')}
        display
        onClose={() => {
          navigate('/home')
        }}
      >
        <PanelMenus>
          {pages.map((page, index) => {
            return (
              <PanelButton
                key={index}
                state={current === page.location ? 'checked' : 'unchecked'}
                onClick={() => {
                  if (page.location !== '/user/logout') {
                    navigate(page.location)
                    return
                  }
                  Emitter('logout').emit({ popup: true })
                }}
              >
                {page.title}
              </PanelButton>
            )
          })}
        </PanelMenus>
        <PanelMiniBoard>
          <Outlet />
        </PanelMiniBoard>
      </Panel>
    </>
  )
}
