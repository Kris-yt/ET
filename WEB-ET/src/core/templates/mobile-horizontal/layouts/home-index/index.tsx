/*
 * @Date: 2024-07-27 02:08:11
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/layouts/home-index/index.tsx
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import style from './style.module.scss'

export default () => {
  return (
    <div className={style['home-index-layout']}>
      <Outlet />
    </div>
  )
}
