/*
 * @Date: 2024-08-07 18:54:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useLoginSendPhoneCode.ts
 * @Description: 登录注册发送短信验证码
 */
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState, useRef } from 'react'
import { useUnmount } from 'react-use'
import useFormPreSubmit from './useFormPreSubmit'
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const [countdown, setCountdown] = useState(0)
  const [ecode, setEcode] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const phoneTip = $t(`手机号码格式不正确`)
  const sendCodeformik = useFormik({
    validateOnMount: true,
    initialValues: {
      flag: 'bind',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required($t(`请输入手机号码`))
        .matches(/^(?:\+63|0)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, phoneTip),
    }),
    onSubmit: (values) => {
      sendPhoneCode({ phoneNumber: values.phoneNumber })
    },
  })

  useUnmount(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
  })

  /**
   * @description: 发送手机验证码
   * @param param0
   * @returns
   */
  const sendPhoneCode = ({ phoneNumber }) => {
    if (countdown > 0) {
      dispatch(ACTIONS.BASE.openToast({ text: $t(`请稍后再试`) }))
      return
    }
    let data: unknown = null
    let method: 'GET' | 'POST' = 'GET'
    const flag = 'bind'
    let uri = ''
    uri = `api/verify/singlesend?flag=${flag}&sendtype=phone&num=${phoneNumber}`
    data = {}
    method = 'GET'

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
          setEcode(res?.data?.ecode)
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
    countdown,
    ecode,
    sendPhoneCode: preSubmit(sendCodeformik),
    sendCodeformik,
    setCountdown,
  }
}
