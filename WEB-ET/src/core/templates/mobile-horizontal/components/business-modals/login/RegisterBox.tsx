/*
 * @Date: 2024-08-06 09:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/login/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import useVerificationlogin from '@/core/hooks/useVerificationlogin'
import InputText from '@shadow/components/input-text'
import Select from '@shadow/components/select'
import style from './style.module.scss'
import useLoginSendPhoneCode from '@/core/hooks/useLoginSendPhoneCode'
import useRegister from '@/core/hooks/useRegister'
import useGlobal from '@/core/hooks/useGlobal'
import Footer from './Footer'

export default () => {
  const { useSelector } = useGlobal()
  const phstorelist = useSelector((state) => state.base.settings?.phstorelist)
  const [_phstorelist, set_phstorelist] = useState([])
  const [sendStatus, setSendStatus] = useState<boolean>(false)
  const { verificationformik, submitVerificationSignIn } =
    useVerificationlogin()
  const { countdown, sendPhoneCode, sendCodeformik, ecode } =
    useLoginSendPhoneCode()
  const { registerformik, submitRegister } = useRegister()

  useEffect(() => {
    filterPhstorelist()
  }, [phstorelist])

  useEffect(() => {
    if (sendStatus) {
      sendPhoneCode()
    }
  }, [sendStatus])
  const filterPhstorelist = () => {
    if (phstorelist?.length) {
      const list = phstorelist.map((i) => {
        const o = { label: '', value: '', status: '' }
        o.label = i.name
        o.value = i.id
        o.status = i.status
        return o
      })
      registerformik.setFieldValue('phstore', list[0]?.value)
      set_phstorelist(list)
    }
  }

  const handlePhoneNumber = (value: string) => {
    sendCodeformik.setFieldValue('phoneNumber', value)
    verificationformik.setFieldValue('username', value)
    registerformik.setFieldValue('username', value)
  }
  const handleCode = (value: any) => {
    verificationformik.setFieldValue('smscode', value)
    registerformik.setFieldValue('smscode', value)
  }

  const handlePhstore = (value: any) => {
    registerformik.setFieldValue('phstore', value)
  }
  const handleSubmitLogin = () => {
    if (ecode) {
      submitVerificationSignIn()
    } else {
      submitRegister()
    }
  }

  return (
    <>
      <div
        className={style['register-container']}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={style['item']}>
          <img
            src={require('./i/phone.png?format=webp')}
            className={style['item-image']}
          />
          <InputText
            name="username"
            type="tel"
            maxLength={11}
            value={registerformik.values.username}
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
            value={registerformik.values.smscode}
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
        <div className={style['item']}>
          <img
            src={require('./i/location.png?format=webp')}
            className={style['item-image']}
          />
          <Select
            name="phstore"
            options={_phstorelist}
            value={registerformik.values.phstore}
            onSelected={(value) => handlePhstore(value)}
            placeholder={$t('实体站不能为空')}
            rightNode={
              <img
                src={require('./i/more.png?format=webp')}
                style={{ width: 24, height: 24 }}
              />
            }
          />
        </div>
        <Footer
          submit={handleSubmitLogin}
          formik={registerformik}
          btnName={$t('注册')}
        />
      </div>
    </>
  )
}
