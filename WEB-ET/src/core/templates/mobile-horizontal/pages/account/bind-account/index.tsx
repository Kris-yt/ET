/*
 * @Date: 2024-10-08 16:15:24
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/account/bind-account/index.tsx
 * @Description:
 */
import Background from '@base-ui/components/background'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import useBindWithdrawAccount from '@/core/hooks/user-account/useBindWithdrawAccount'
import { EBindAccountType } from '@hooks/user-account/useBindWithdrawAccount'
import style from './style.module.scss'
import type { IProps } from './types'

export default ({ onClose, accountType }: IProps) => {
  const { countdown, sendPhoneCode, formikPhone, formik, submit } =
    useBindWithdrawAccount({ type: accountType, onBindSuccess: onClose })

  const accountTitles = {
    [EBindAccountType.GrabPay]: 'Grab Pay',
    [EBindAccountType.GCash]: 'Gcash',
    [EBindAccountType.MayaPay]: 'Maya',
  }

  const handlePhoneNumberChange = (value: string) => {
    // 按菲律宾号码规则限制长度
    const formattedValue = value.slice(0, 9)
    formikPhone.handleChange({
      target: { name: 'phoneNumber', value: formattedValue },
    })
  }

  return (
    <div className={style['bind']}>
      <button className={style['back']} onClick={onClose}>
        <Background
          className={style['back-icon']}
          tag={'div'}
          src={require('./i/bind.png?format=webp')}
        ></Background>
        {`Bind ${accountTitles[accountType]}` || 'Bind Account'}
      </button>
      <div className={style['content']}>
        <div
          className={style['title']}
        >{`${accountTitles[accountType]} account (09xx-xxx-xxxx):`}</div>
        <InputText
          placeholder="xx-xxx-xxxx"
          leftNode={<span className={style['phone-code']}>09</span>}
          name="phoneNumber"
          value={formikPhone.values.phoneNumber}
          onChange={(value) => handlePhoneNumberChange(value)}
        />
      </div>
      <div className={style['content-code']}>
        <InputText
          placeholder="Please enter code"
          rightNode={
            countdown > 0 ? (
              <span className={style['send-code']}>{countdown}s</span>
            ) : (
              <span onClick={sendPhoneCode} className={style['send-code']}>
                Send
              </span>
            )
          }
          name="validcode"
          value={formik.values.validcode}
          onChange={(value) =>
            formik.handleChange({ target: { name: 'validcode', value } })
          }
        />
      </div>
      <Button className={style['button']} onClick={submit}>
        {$t('确定')}
      </Button>
    </div>
  )
}
