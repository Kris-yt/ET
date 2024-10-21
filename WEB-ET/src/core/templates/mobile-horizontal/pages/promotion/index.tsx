/*
 * @Date: 2024-08-07 16:00:46
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/promotion/index.tsx
 * @Description:
 */
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useMount } from 'react-use'
import Overlay from '@base-ui/components/overlay'
import usePromotion from './usePromotion'
import style from './style.module.scss'
import Loading from '@shadow/components/loading'

export default () => {
  const navigate = useNavigate()
  const { state: currentId } = useLocation()
  const { getPromotionList, promotionList } = usePromotion()

  useMount(getPromotionList)

  return (
    <Overlay className={style['overlay-position']} display zIndex={10}>
      <div className={style['promotion-container']}>
        <div className={style['promotion-content']}>
          {!currentId && (
            <div
              className={style['promotion-list-close']}
              onClick={() => navigate('/home')}
            >
              <img src={require('./i/close.png?format=webp')} alt="close" />
            </div>
          )}
          <ul
            className={`${style['promotion-list']} ${currentId && style['promotion-list-shadow']}`}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {promotionList ? (
              promotionList.map((listItem: any) => (
                <PromotionItem key={listItem.id} listItem={listItem} />
              ))
            ) : (
              <Loading />
            )}
          </ul>
          {currentId && (
            <div className={style['promotion-detail']}>
              <div
                className={style['promotion-back2list']}
                onClick={() => navigate('/home/promotion')}
              >
                <img
                  src={require('./i/back2list.png?format=webp')}
                  alt="back"
                />
              </div>
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </Overlay>
  )
}

const PromotionItem = ({ listItem }: any) => {
  const navigate = useNavigate()

  const onErrorImg = (e: any) => {
    e.target.src = require('./i/error.png?format=webp')
    e.target.onerror = null
  }
  return (
    <li
      key={listItem.id}
      className={style['promotion-item']}
      onClick={() =>
        navigate('/home/promotion/detail/' + listItem.id, { state: listItem })
      }
    >
      <div className={style['promotion-item-img']}>
        <img src={listItem.h5_image} alt="" onError={onErrorImg} />
      </div>
      <div className={style['promotion-item-t']}>{listItem.title}</div>
    </li>
  )
}
