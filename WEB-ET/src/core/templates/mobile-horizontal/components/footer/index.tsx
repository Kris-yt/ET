/*
 * @Date: 2024-07-30 01:31:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/footer/index.tsx
 * @Description:
 */
import { useNavigate } from 'react-router-dom'
import Background from '@base-ui/components/background'
import { caclWithWidth } from '@utlis/rateCalc'
import style from './style.module.scss'
import useGlobal from '@/core/hooks/useGlobal'
import useAuth from '@/core/hooks/useAuth'
export default () => {
  const marginTop = caclWithWidth(812, 36).height
  const navigate = useNavigate()
  const { dispatch, ACTIONS, useSelector } = useGlobal()
  const { checkKYCVerifeid } = useAuth()
  const noFoundPage = () => {
    dispatch(ACTIONS.BASE.openToast({ text: $t('缺少页面'), type: 'info' }))
  }
  const customer_service_url = useSelector(
    (state) => state.base.settings?.customer_service_url,
  )
  const userInfo = useSelector<any>((state) => state.user.info)
  const getRandom7DigitString = () => {
    let result = ''
    for (let i = 0; i < 7; i++) {
      result += Math.floor(Math.random() * 10) // 生成 0-9 的随机数
    }
    return result
  }

  const handlecustomerserviceurl = () => {
    if (customer_service_url) {
      userInfo.userid !== undefined
        ? window.open(
            customer_service_url + '&clientId=' + userInfo?.userid?.toString(),
          )
        : window.open(
            customer_service_url + '&clientId=' + getRandom7DigitString(),
          )
    } else {
      noFoundPage()
    }
  }
  return (
    <Background
      className={style['footer']}
      src={require('./i/bg.png?format=webp')}
      style={caclWithWidth(812, 83)}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <div className={style['buttons']}>
        <img
          src={require('./i/promotion.png?format=webp')}
          style={{ ...caclWithWidth(75, 64), marginTop }}
          onClick={() => navigate('/home/promotion')}
        />
        <img
          src={require('./i/cooperate.png?format=webp')}
          style={{ ...caclWithWidth(87, 65), marginTop }}
          onClick={() => navigate('/home/joint-plan')}
        />
        <img
          src={require('./i/wallet.png?format=webp')}
          style={{ ...caclWithWidth(77, 62), marginTop }}
          onClick={checkKYCVerifeid(() => navigate('/wallet'))}
        />
        <img
          src={require('./i/message.png?format=webp')}
          style={{ ...caclWithWidth(95, 59), marginTop }}
          onClick={() =>
            userInfo.userid
              ? navigate('/home/messagecenter')
              : navigate('/home/login')
          }
        />
        <img
          src={require('./i/chat.png?format=webp')}
          style={{ ...caclWithWidth(66, 66), marginTop }}
          onClick={
            handlecustomerserviceurl
            // customer_service_url
            //   ? window.open(customer_service_url)
            //   : noFoundPage()
          }
        />
        <img
          src={require('./i/download.png?format=webp')}
          style={{ ...caclWithWidth(100, 66), marginTop }}
          onClick={() => navigate('/download')}
        />
        <img
          src={require('./i/deposit.png?format=webp')}
          style={caclWithWidth(171, 72.5)}
          onClick={checkKYCVerifeid(() => navigate('/wallet/deposit'))}
        />
      </div>
      <div className={style['information']}>
        <img
          src={require('./i/gaming.png?format=webp')}
          className={style['gaming']}
        />
        <img
          src={require('./i/pogo.png?format=webp')}
          className={style['pogo1']}
        />
        <img
          src={require('./i/pogo2.png?format=webp')}
          className={style['pogo2']}
        />
        <img
          src={require('./i/pogo3.png?format=webp')}
          className={style['pogo3']}
        />
      </div>
      <div className={style['describe']}>
        <span className={style['title-describe']}></span>
        <span className={style['title']}>
          This game is intended for recreational purposes only. Players are
          encouraged to play responsibly. Gambling is prohibited for minors and
          should not be conducted in open and public spaces. For more
          information, please visit our Responsible Gaming page.
        </span>
      </div>
    </Background>
  )
}
