import { useLocation } from 'react-router-dom'
// import { useEffect } from 'react'
import style from '../style.module.scss'
import Button from '@shadow/components/button'

export default () => {
  const { state: promotion } = useLocation()

  // useEffect(() => {
  //   console.log(`活动id:${promotion.id}请求详情`)
  // }, [promotion])

  const getButton = () => {
    if (promotion.apply_btn === 1 && promotion.receive_type === 1) {
      return (
        <div className={style['btn']}>
          <Button size="md" onClick={() => {}}>
            申请
          </Button>
        </div>
      )
    }
  }
  return (
    <div
      className={style['promotion-des']}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <img src={promotion?.h5_detail_image} alt="" />
      {getButton()}
    </div>
  )
}
