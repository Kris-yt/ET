/*
 * @Date: 2024-10-05 15:43:04
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/account/index.tsx
 * @Description:
 */
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PanelButton from '@shadow/components/panel/button'
import Panel, {
  PanelMiniBoard,
  PanelMenus,
} from '@shadow/components/panel/index'
import Background from '@base-ui/components/background'
import { pages } from './const'
import style from './style.module.scss'

export default () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const token = React.useRef(state?.token).current

  // 默认选中第一个页面
  const defaultPath = pages[0]?.location || '/'

  const [current, setCurrent] = React.useState(pathname)

  React.useEffect(() => {
    if (!token) {
      navigate('/wallet')
      return
    }
    if (pathname === '/account') {
      navigate(defaultPath, { state: { token } })
      return
    }
    setCurrent(pathname)
  }, [pathname, state])

  return (
    <Panel
      type="page"
      title="Fund Accounts"
      display
      isShowBack
      onBack={() => navigate('/wallet')}
    >
      <PanelMenus>
        {pages.map((page, index) => (
          <PanelButton
            key={index}
            state={current === page.location ? 'checked' : 'unchecked'}
            onClick={() => {
              navigate(page.location, { state: { token } })
              setCurrent(page.location)
            }}
          >
            <Background
              className={style[page.style]}
              tag="div"
              src={
                current === page.location
                  ? page.checkedImage
                  : page.uncheckedImage
              }
            />
          </PanelButton>
        ))}
      </PanelMenus>

      <PanelMiniBoard>
        <Outlet />
      </PanelMiniBoard>
    </Panel>
  )
}
