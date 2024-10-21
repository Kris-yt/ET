/*
 * @Date: 2024-08-30 11:37:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/home/index.tsx
 * @Description:
 */
import style from './style.module.scss'
import VerticalPlaceholder from '@shadow/components/orientation-alert/index'
import { useEffect, useState } from 'react'

export default () => {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight,
  )

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isLandscape ? (
    <VerticalPlaceholder orientation={'horizontal'} />
  ) : (
    <div className={style['download-container']}>
      <div className={style['download-content']}>
        <a href="javascript:void(0)" className={style['download-btn']}></a>
        {/* <div className={style['download-box']}>
            <a className={style['google-play']}></a>
            <a className={style['app-store']}></a>
            <a className={style['app-gallery']}></a>
          </div> */}
      </div>
    </div>
  )
}
