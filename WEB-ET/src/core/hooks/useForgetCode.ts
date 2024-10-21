/*
 * @Date: 2024-08-12 10:26:57
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useRegister.ts
 * @Description:
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useGlobal from './useGlobal'
import { useState, useRef } from 'react'
import useFormPreSubmit from './useFormPreSubmit'
export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const [step, setStep] = useState(1)
  const { preSubmit } = useFormPreSubmit()
  const [countdown, setCountdown] = useState(0)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const phoneTip = $t(`手机号码格式不正确`)
  const forgetcodeformik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      smscode: '',
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required($t('手机号不能为空'))
        .matches(/^(?:\+63|0)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, phoneTip),
    }),
    onSubmit: async (values) => {
      sendPhoneCode({ phoneNumber: values.username })
    },
  })
  const sendPhoneCode = ({ phoneNumber }) => {
    if (countdown > 0) {
      dispatch(ACTIONS.BASE.openToast({ text: $t(`请稍后再试`) }))
      return
    }
    let uri = ''
    const data: unknown = null
    const method: 'GET' | 'POST' = 'GET'
    uri = `api/verify/singlesend?flag=resetPass&sendtype=phone&num=${phoneNumber}`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        data,
        method,
        cb: (res: any) => {
          if (res.status !== 10000) {
            dispatch(
              ACTIONS.BASE.openToast({ type: 'error', text: res.message }),
            )
            return
          }
          dispatch(
            ACTIONS.BASE.openToast({
              text: $t('验证码发送成功'),
              type: 'success',
            }),
          )
          setCountdown(res?.data?.timeoutsec ?? 150)
          timer.current = setInterval(() => {
            setCountdown((prev) => {
              if (prev === 1) {
                clearInterval(timer.current as NodeJS.Timeout)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        },
      }),
    )
  }

  return {
    step,
    setStep,
    forgetcodeformik,
    nextStep: preSubmit(forgetcodeformik),
    countdown,
  }
}
