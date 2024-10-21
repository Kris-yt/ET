/*
 * @Date: 2024-08-06 09:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/fotgot-password/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import useEventEmitter from '@hooks/useEventEmitter'
import MiniPanel from '@shadow/components/mini-panel'
import InputText from '@shadow/components/input-text'
import Button from '@shadow/components/button'
import style from './style.module.scss'
const EyeOpen = require('./i/eyeopen.png?format=webp')
const EyeClose = require('./i/eyeclose.png?format=webp')
import useForgetPass from '@/core/hooks/useForgetPass'
import useForgetCode from '@/core/hooks/useForgetCode'
export default () => {
  const { forgetcodeformik, step, setStep, countdown, nextStep } =
    useForgetCode()

  const { formik, submitPassword } = useForgetPass()
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)

  const { emit: closeModal } = useEventEmitter('closeForgetPassword')
  const [displayPassword, setDisplayPassword] = useState(false)
  const [displayPassword2, setDisplayPassword2] = useState(false)
  useEventEmitter('openForgetPassword', () => {
    setDisplayModal(true)
  })

  useEffect(() => {
    if (displayModal === false) {
      closeModal()
      setStep(1)
      forgetcodeformik.values.username = ''
      forgetcodeformik.values.smscode = ''
      formik.values.username = ''
      formik.values.smscode = ''
      formik.values.password = ''
      formik.values.passwordconfirm = ''
    }
  }, [displayModal])
  const handlePhoneNumber = (value: string) => {
    formik.setFieldValue('username', value)
    forgetcodeformik.setFieldValue('username', value)
  }
  const handleCode = (value: any) => {
    formik.setFieldValue('smscode', value)
    forgetcodeformik.setFieldValue('smscode', value)
  }

  if (!displayModal) {
    return <></>
  }
  return (
    <MiniPanel
      title={$t('忘记密码')}
      size="m"
      display={!!displayModal}
      onClose={() => setDisplayModal(false)}
    >
      <div className={style['forgotpassword-container']}>
        {step === 1 && (
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
                value={forgetcodeformik.values.username}
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
                maxLength={6}
                value={forgetcodeformik.values.smscode}
                onChange={(value) => handleCode(value)}
                placeholder="Verification code"
                rightNode={
                  <span
                    className={`${style.checkcode} ${countdown === 0 && forgetcodeformik.values.username !== '' ? style.active : style.disabled}`}
                    onClick={() => nextStep()}
                  >
                    {countdown || 'Send'}
                  </span>
                }
              />
            </div>
            <div className={style['item2']}>
              <Button
                disabled={
                  !(
                    forgetcodeformik.values.username != '' &&
                    forgetcodeformik.values.smscode != ''
                  )
                }
                onClick={() => {
                  setStep(2)
                }}
              >
                {$t('确定')}
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className={style['item']}>
              <img
                src={require('./i/password.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                name="password"
                value={formik.values.password}
                onChange={(value) =>
                  formik.handleChange({ target: { name: 'password', value } })
                }
                type={displayPassword ? 'text' : 'password'}
                placeholder={$t('输入由字母和数字组成的16位字符')}
                rightNode={
                  <img
                    src={displayPassword ? EyeOpen : EyeClose}
                    className={style['password-eye']}
                    onClick={() => setDisplayPassword(!displayPassword)}
                  />
                }
                tips={formik.errors.password && formik.touched.password}
              />
            </div>
            <div className={style['item']}>
              <img
                src={require('./i/password.png?format=webp')}
                className={style['item-image']}
              />
              <InputText
                name="password"
                value={formik.values.passwordconfirm}
                onChange={(value) =>
                  formik.handleChange({
                    target: { name: 'passwordconfirm', value },
                  })
                }
                type={displayPassword2 ? 'text' : 'password'}
                placeholder={$t('输入由字母和数字组成的16位字符')}
                rightNode={
                  <img
                    src={displayPassword2 ? EyeOpen : EyeClose}
                    className={style['password-eye']}
                    onClick={() => setDisplayPassword2(!displayPassword2)}
                  />
                }
                tips={formik.errors.password && formik.touched.password}
              />
            </div>
            <div className={style['item2']}>
              <Button
                disabled={
                  !(
                    formik.values.passwordconfirm != '' &&
                    formik.values.password != ''
                  )
                }
                onClick={() => submitPassword()}
              >
                {$t('确定')}
              </Button>
            </div>
          </>
        )}
      </div>
    </MiniPanel>
  )
}
