/*
 * @Date: 2024-07-29 16:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/home/index.tsx
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import Header from '@shadow/components/header/index'
import Navigation from '@shadow/pages/home/navigation/index'
import Footer from '@shadow/components/footer/index'
import Limitmodules from '@shadow/pages/home/limitmodules/index'
import useGlobal from '@/core/hooks/useGlobal'
import style from './style.module.scss'

export default () => {
  const { useSelector } = useGlobal()
  const userInfo = useSelector((state) => state.user.info)

  return (
    <div className={style['home-container']}>
      <Header />
      <Navigation />
      <Footer />
      <Outlet />
      {!userInfo?.userid && <Limitmodules />}
    </div>
  )
}
