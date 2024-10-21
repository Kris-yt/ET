/*
 * @Date: 2024-08-23 9:24:49
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/game-iframe/index.tsx
 * @Description:
 */
import { useLocation } from 'react-router-dom'
import style from './style.module.scss'

export default () => {
  const { state } = useLocation()

  return (
    <div className={style['iframe']}>
      {state && (
        <iframe src={state} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  )
}
