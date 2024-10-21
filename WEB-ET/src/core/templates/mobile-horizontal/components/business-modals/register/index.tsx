/*
 * @Date: 2024-08-06 09:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/register/index.tsx
 * @Description:
 */
import { useEffect, useState, useCallback } from 'react'
import useEventEmitter from '@hooks/useEventEmitter'
import MiniPanel from '@shadow/components/mini-panel'
import InputText from '@shadow/components/input-text'
import useRegister from '@/core/hooks/useRegister'
import Button from '@shadow/components/button'
import style from './style.module.scss'
import PrivacyPolicy from '@templates/components/business-modals/privacy-policy'
import TermServices from '@templates/components/business-modals/term-services'
// const EyeOpen = require('./i/eyeopen.png?format=webp')
// const EyeClose = require('./i/eyeclose.png?format=webp')

export default () => {
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)
  // const [displayPassword1, setDisplayPassword1] = useState(false)
  // const [displayPassword2, setDisplayPassword2] = useState(false)
  const [termServicesModal, setTermServicesModal] = useState<boolean>(false)
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState<boolean>(false)
  const { registerformik, submitRegister } = useRegister()
  const { emit: closeModal } = useEventEmitter('closeRegister')

  useEventEmitter('openRegister', () => {
    setDisplayModal(true)
  })

  useEventEmitter('registerSuccess', () => {
    setDisplayModal(false)
  })

  useEffect(() => {
    if (displayModal === false) {
      closeModal()
      registerformik.values.username = ''
    }
  }, [displayModal])

  const handleGoLogin = useCallback(() => {
    Emitter('navigate').emit('/home/login')
    setDisplayModal(false)
  }, [])

  if (!displayModal) {
    return <></>
  }

  return (
    <>
      <MiniPanel
        title={$t('注册')}
        size="m"
        display={!!displayModal}
        onClose={() => setDisplayModal(false)}
      >
        <div className={style['register-container']}>
          <div className={style['item']}>
            <img
              src={require('./i/vector.png?format=webp')}
              className={style['item-image']}
            />
            <InputText
              name="username"
              value={registerformik.values.username}
              onChange={(value) =>
                registerformik.handleChange({
                  target: { name: 'username', value },
                })
              }
              placeholder={$t('输入由字母和数字组成的12位字符')}
              // tips={formik.errors.username && formik.touched.username}
            />
            <span
              className={`${style['withUnderline']} ${style['toLogin']} `}
              onClick={handleGoLogin}
            >
              Login
            </span>
          </div>
          <div className={style['item']}>
            <img
              src={require('./i/password.png?format=webp')}
              className={style['item-image']}
            />
          </div>
          <div className={style['item']}>
            <img
              src={require('./i/password.png?format=webp')}
              className={style['item-image']}
            />
          </div>
          <div className={style['item']}>
            <Button onClick={submitRegister}>{$t('注册')}</Button>
          </div>
          <div className={style['agreement']}>
            I agree to the&nbsp;
            <span
              className={style['withUnderline']}
              onClick={() => setTermServicesModal(true)}
            >
              {$t('网站协议')}
            </span>
            &nbsp;and&nbsp;
            <span
              className={style['withUnderline']}
              onClick={() => setPrivacyPolicyModal(true)}
            >
              {$t('隐私政策')}
            </span>
            .
          </div>
        </div>
      </MiniPanel>
      {termServicesModal && (
        <TermServices onClose={() => setTermServicesModal(false)} />
      )}
      {privacyPolicyModal && (
        <PrivacyPolicy onClose={() => setPrivacyPolicyModal(false)} />
      )}
    </>
  )
}
