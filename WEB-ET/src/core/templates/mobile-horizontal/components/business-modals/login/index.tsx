/*
 * @Date: 2024-08-06 09:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/login/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import useLogin from '@/core/hooks/useLogin'
import useVerificationlogin from '@/core/hooks/useVerificationlogin'
import useEventEmitter from '@hooks/useEventEmitter'
import LoginPanel from '@shadow/components/login-panel'
import useRegister from '@/core/hooks/useRegister'
import LoginBox from './LoginBox'
import RegisterBox from './RegisterBox'

export default () => {
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)
  const [tabs, setTabs] = useState<string>('register')
  const { formik } = useLogin()
  const { registerformik } = useRegister()
  const { verificationformik } = useVerificationlogin()
  const { emit: closeModal } = useEventEmitter('closeLogin')

  useEventEmitter('openLogin', () => {
    setDisplayModal(true)
  })

  useEventEmitter('loginSuccess', () => {
    setDisplayModal(false)
  })

  useEffect(() => {
    if (displayModal === false) {
      closeModal()
      formik.values.username = ''
      formik.values.password = ''
      verificationformik.values.username = ''
      verificationformik.values.smscode = ''
    } else {
      onResetformik()
    }
  }, [tabs, displayModal])

  const onResetformik = () => {
    if (tabs === 'register') {
      formik.values.username = ''
      formik.values.password = ''
      verificationformik.values.username = ''
      verificationformik.values.smscode = ''
    }
    if (tabs === 'login') {
      registerformik.values.username = ''
      registerformik.values.smscode = ''
      verificationformik.values.username = ''
      verificationformik.values.smscode = ''
    }
  }

  if (!displayModal) {
    return <></>
  }

  return (
    <>
      <LoginPanel
        title={{ register: $t('注册'), login: $t('登录') }}
        size="m"
        display={!!displayModal}
        tabs={tabs}
        onChangeTabs={(key: string) => setTabs(key)}
        onClose={() => setDisplayModal(false)}
      >
        {tabs == 'register' && <RegisterBox />}
        {tabs == 'login' && <LoginBox />}
      </LoginPanel>
    </>
  )
}
