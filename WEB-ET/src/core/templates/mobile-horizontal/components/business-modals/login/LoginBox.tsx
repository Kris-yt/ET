/*
 * @Date: 2024-08-06 09:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/login/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import useLogin from '@/core/hooks/useLogin'
import InputText from '@shadow/components/input-text'
import style from './style.module.scss'
import Footer from './Footer'
import useLoginSendPhoneCode from '@/core/hooks/useLoginSendPhoneCode'
import useVerificationlogin from '@/core/hooks/useVerificationlogin'

const EyeOpen = require('./i/eyeopen.png?format=webp')
const EyeClose = require('./i/eyeclose.png?format=webp')

export default () => {
  const [displayPassword, setDisplayPassword] = useState(false)
  const { formik, submitSignIn } = useLogin()
  const [loginType, setLoginType] = useState<string>('password')
  const [sendStatus, setSendStatus] = useState<boolean>(false)
  const { countdown, sendPhoneCode, sendCodeformik } = useLoginSendPhoneCode()
  const { verificationformik, submitVerificationSignIn } =
    useVerificationlogin()

  useEffect(() => {
    formik.setFieldValue('username', '')
    formik.setFieldValue('password', '')
    verificationformik.setFieldValue('username', '')
    verificationformik.setFieldValue('smscode', '')
  }, [loginType])

  useEffect(() => {
    if (sendStatus) {
      sendPhoneCode()
    }
  }, [sendStatus])

  const handleUsername = (value: string) => {
    formik.setFieldValue('username', value)
  }
  const handlePassword = (value: string) => {
    formik.setFieldValue('password', value)
  }
  const handlePhoneNumber = (value: string) => {
    sendCodeformik.setFieldValue('phoneNumber', value)
    verificationformik.setFieldValue('username', value)
  }
  const handleCode = (value: any) => {
    verificationformik.setFieldValue('smscode', value)
  }
  return (
    <>
      <div
        className={style['login-container']}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {loginType === 'password' && (
          <>
            <div className={style['item']}>
              <img
                src={require('./i/vector.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                type="text"
                name="username"
                value={formik.values.username}
                onChange={(value) => handleUsername(value)}
                placeholder={
                  loginType === 'password'
                    ? 'Username/Phone Number'
                    : 'Phone Number (09*********)'
                }

                // tips={formik.errors.username && formik.touched.username}
              />
            </div>
            <div className={style['item']}>
              <img
                src={require('./i/password.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                name="password"
                type={displayPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={(value) => handlePassword(value)}
                placeholder={$t('密码')}
                rightNode={
                  <img
                    src={displayPassword ? EyeOpen : EyeClose}
                    className={style['password-eye']}
                    onClick={() => setDisplayPassword(!displayPassword)}
                  />
                }
                // tips={formik.errors.password && formik.touched.password}
              />
            </div>
            <div className={style['more']}>
              <span></span>
              <span
                className={style['login-type']}
                onClick={() => {
                  formik.setFieldValue('password', '')
                  setLoginType('smscode')
                }}
              >
                {$t('验证码')}
              </span>
            </div>
            <Footer
              submit={submitSignIn}
              formik={formik}
              btnName={$t('登录')}
            />
          </>
        )}

        {loginType === 'smscode' && (
          <>
            <div className={style['item']}>
              <img
                src={require('./i/phone.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                name="username"
                type="tel"
                maxLength={11}
                value={verificationformik.values.username}
                onChange={(value) => handlePhoneNumber(value)}
                placeholder="Phone Number (09*********)"

                // tips={formik.errors.username && formik.touched.username}
              />
            </div>
            <div className={style['item']}>
              <img
                src={require('./i/verify.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                name="code"
                type="tel"
                maxLength={6}
                value={verificationformik.values.smscode}
                onChange={(value) => handleCode(value)}
                placeholder="Verification code"
                rightNode={
                  <span
                    className={`${style.checkcode} ${countdown === 0 && verificationformik.values.username !== '' && !sendStatus ? style.active : style.disabled}`}
                    onClick={() => {
                      setSendStatus(true)
                      setTimeout(() => {
                        setSendStatus(false)
                      }, 1000)
                    }}
                  >
                    {countdown || 'Send'}
                  </span>
                }
              />
            </div>
            <div className={style['more']}>
              <span></span>
              <span
                className={style['login-type']}
                onClick={() => {
                  verificationformik.setFieldValue('smscode', '')
                  setLoginType('password')
                }}
              >
                {$t('密码')}
              </span>
            </div>
            <Footer
              submit={submitVerificationSignIn}
              formik={verificationformik}
              btnName={$t('登录')}
            />
          </>
        )}
      </div>
    </>
  )
}
