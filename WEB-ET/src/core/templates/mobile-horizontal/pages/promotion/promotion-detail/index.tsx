import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import style from '../style.module.scss'

export default () => {
  const { state } = useLocation()

  useEffect(() => {
    console.log(`活动id:${state.id}请求详情`)
  }, [state])
  return (
    <div
      className={style['promotion-des']}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <img src={state.h5_detail_image} alt="" />
    </div>
  )
}
