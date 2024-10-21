// import { useState } from 'react';
// import Background from '@base-ui/components/background';
import style from './style.module.scss'
import Carousel from '@shadow/components/carousel'
import { useNavigate } from 'react-router-dom'
import Background from '@base-ui/components/background'
import Copy from '@shadow/components/copy'
import useGlobal from '@/core/hooks/useGlobal'

export default () => {
  const navigate = useNavigate()
  const { dispatch, ACTIONS, useSelector } = useGlobal()

  const customer_service_url = useSelector(
    (state) => state.base.settings?.customer_service_url,
  )
  const noFoundPage = () => {
    dispatch(ACTIONS.BASE.openToast({ text: $t('缺少页面'), type: 'info' }))
  }
  return (
    <div className={style['joint-plan-container']}>
      <div className={style['go-back']} onClick={() => navigate('/home')} />
      <Carousel>
        {/* <Background className={style['item']} src={require('./i/joint-1.png?format=webp')}>
        </Background> */}
        <div className={style['item']}>
          <img src={require('./i/joint-1.webp')} alt={`banner-1`} />
        </div>
        <div className={style['item']}>
          <img src={require('./i/joint-2.webp')} alt={`banner-2`} />
        </div>
        <div className={style['item']}>
          <img src={require('./i/joint-3.webp')} alt={`banner-3`} />
          <Background
            className={style['chatting-box']}
            src={require('./i/chat-btn.png?format=webp')}
            onClick={() => {
              customer_service_url
                ? window.open(customer_service_url)
                : noFoundPage()
            }}
          >
            <div className={style['thumb']}>
              <img src={require('./i/thumb.png?format=webp')} alt="thumb" />
            </div>
          </Background>
          <Background
            className={style['email-box']}
            src={require('./i/email-address.png?format=webp')}
          >
            <p className={style['email-address']}>
              Email:
              <span>qwertyu12346@gamil.com</span>
            </p>
            <Copy text="qwertyu12346@gamil.com">
              <div className={style['copy-btn']}>
                <img src={require('./i/copy-btn.png?format=webp')} alt="copy" />
              </div>
            </Copy>
          </Background>
        </div>
      </Carousel>
    </div>
  )
}
