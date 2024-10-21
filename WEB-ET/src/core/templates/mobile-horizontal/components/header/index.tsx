/*
 * @Date: 2024-07-30 00:15:35
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/header/index.tsx
 * @Description:
 */
import Button from '@shadow/components/button/index'
import Background from '@base-ui/components/background'
import useGlobal from '@/core/hooks/useGlobal'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import useAnnouncement from '@/core/hooks/useAnnouncement'
import useBalance from '@/core/hooks/useBalance'
import { useEffect } from 'react'
import Copy from '@shadow/components/copy'
import useAuth from '@/core/hooks/useAuth'
export default () => {
  const navigate = useNavigate()
  const { useSelector } = useGlobal()
  const { doQuery, data } = useAnnouncement()
  const { toDecimal } = useBalance()
  const { checkKYCVerifeid } = useAuth()

  useEffect(() => {
    doQuery()
  }, [])

  const userInfo = useSelector<any>((state) => state.user.info)
  const vip = useSelector((state) => state.user.vip)
  const viplist = [
    { id: 0, imgSrc: require('./i/v0.png?format=webp') },
    { id: 1, imgSrc: require('./i/v1.png?format=webp') },
    { id: 2, imgSrc: require('./i/v2.png?format=webp') },
    { id: 3, imgSrc: require('./i/v3.png?format=webp') },
    { id: 4, imgSrc: require('./i/v4.png?format=webp') },
    { id: 5, imgSrc: require('./i/v5.png?format=webp') },
    { id: 6, imgSrc: require('./i/v6.png?format=webp') },
    { id: 7, imgSrc: require('./i/v7.png?format=webp') },
    { id: 8, imgSrc: require('./i/v8.png?format=webp') },
    { id: 9, imgSrc: require('./i/v9.png?format=webp') },
    { id: 10, imgSrc: require('./i/v10.png?format=webp') },
    { id: 11, imgSrc: require('./i/v11.png?format=webp') },
    { id: 12, imgSrc: require('./i/v12.png?format=webp') },
  ]
  return (
    <div className={`${style['header']}`}>
      <div className={style['loginStatusBox']}>
        {userInfo.userid ? (
          <Background
            className={style['logined']}
            src={require('./i/logo-bg.png?format=webp')}
          >
            <div
              className={style['profile']}
              onClick={() => navigate('/user/security')}
            ></div>
            <div className={style['user-right']}>
              <div className={style['user-bg']}>
                <div className={style['username']}>{userInfo.username}</div>
                <Copy text={userInfo.username}>
                  <Background
                    className={style['copy']}
                    src={require('./i/copy.png')}
                  ></Background>
                </Copy>
              </div>
              <div className={style['vipLevel']}>
                {/* <img src={require('./i/v1.png?format=webp')} alt="" />  */}
                <img src={viplist[vip?.level || 0]?.imgSrc} alt="" />
              </div>
            </div>
          </Background>
        ) : (
          <div className={style['noLogin']}>
            <Button
              className={style['login-button']}
              size="xd"
              onClick={() => navigate('/home/login')}
              onTouchStart={() => navigate('/home/login')}
            >
              {$t('登录/注册')}
            </Button>
            {/* <Button
              className={style['register-button']}
              size="sm"
              type="cancel"
              onClick={() => navigate('/home/register')}
            >
              {$t('注册')}
            </Button> */}
          </div>
        )}
      </div>
      <Background
        className={style['notice-bar']}
        tag="div"
        src={require('./i/notification-bg.png?format=webp')}
        onClick={() => navigate('/home/announcement')}
      >
        <Marquee>
          {data?.map((item: any, index: number) => (
            <span key={index} className={style['notice-item']}>
              {item.title}
            </span>
          ))}
        </Marquee>
      </Background>
      {userInfo.userid && (
        <Background
          src={require('./i/coin-bg.png?format=webp')}
          tag="div"
          className={style['showCoinBox']}
        >
          <img
            className={style['item-icon']}
            src={require('./i/ic-left.png?format=webp')}
            alt=""
          />
          <span className={style['item-amount']}>
            {toDecimal(userInfo.availablebalance)}
          </span>
          <img
            className={style['item-icon']}
            src={require('./i/ic-right.png?format=webp')}
            alt=""
            onClick={checkKYCVerifeid(() => navigate('/wallet/deposit'))}
          />
        </Background>
      )}
      <img
        src={require('./i/logo.png?format=webp')}
        alt="menu"
        className={style['logo-icon']}
      />
    </div>
  )
}
