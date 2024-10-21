/*
 * @Date: 2024-08-07 18:54:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useSendPhoneCode.ts
 * @Description:
 */
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState, useRef } from 'react'
import { useUnmount } from 'react-use'
import useFormPreSubmit from './useFormPreSubmit'
import useGlobal from './useGlobal'

interface IProps {
  flag: ESendPhoneCodeFlag
  token?: string
}
export default ({ flag, token }: IProps) => {
  const { dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const [countdown, setCountdown] = useState(0)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const phoneTip = $t(`请输入有效的菲律宾手机号`)

  // 校验规则
  const getValidationSchema = () => {
    switch (flag) {
      case ESendPhoneCodeFlag.bind:
      case ESendPhoneCodeFlag.update:
        return Yup.object({
          phoneNumber: Yup.string()
            .required($t(`请输入手机号码`))
            .matches(/^(\+63|0)?(9\d{9})$/, phoneTip),
        })
      case ESendPhoneCodeFlag.bindGcash:
      case ESendPhoneCodeFlag.bindMaya:
      case ESendPhoneCodeFlag.bindGrabPay:
        return Yup.object({
          phoneNumber: Yup.string()
            .required($t(`请输入手机号码`))
            .matches(/^(\d{9})$/, phoneTip),
        })
      default:
        return null
    }
  }

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: getValidationSchema(),
    onSubmit: async (values) => {
      await formik.validateForm()
      let phoneNumber = values.phoneNumber
      // 省略了 09
      if (values.phoneNumber.length === 9) {
        phoneNumber = `09${values.phoneNumber}`
      }
      if (formik.isValid) {
        sendPhoneCode({ phoneNumber })
      } else {
        dispatch(ACTIONS.BASE.openToast({ text: phoneTip }))
      }
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
  const sendPhoneCode = ({ phoneNumber }: ISendPhoneCode) => {
    if (countdown > 0) {
      dispatch(ACTIONS.BASE.openToast({ text: $t(`请稍后再试`) }))
      return
    }
    let uri = ''
    let data: unknown = null
    let method: 'GET' | 'POST' = 'GET'
    if (flag)
      if (flag === ESendPhoneCodeFlag.bind) {
        uri = `api/verify/singlesend?flag=${flag}&sendtype=phone&num=${phoneNumber}`
      }
    if (flag === ESendPhoneCodeFlag.updateVerify) {
      uri = `api/verify/updateverify`
      data = {
        flag: 'initialSend',
        sendtype: 'phone',
        updatetype: 'phone',
      }
      method = 'POST'
    }
    if (flag === ESendPhoneCodeFlag.update) {
      uri = `api/verify/updateverify`
      data = {
        flag: 'updateSend',
        sendtype: 'phone',
        num: phoneNumber,
        token: token,
      }
      method = 'POST'
    }
    if (flag === ESendPhoneCodeFlag.resetPass) {
      uri = `api/verify/singlesend?flag=resetloginpassword&sendtype=phone&num=${phoneNumber}`
    }
    if (flag === ESendPhoneCodeFlag.bindGcash) {
      uri = `api/verify/singlesend?flag=bindwithdrawaccount_2&sendtype=phone&num=${phoneNumber}`
    }
    if (flag === ESendPhoneCodeFlag.bindMaya) {
      uri = `api/verify/singlesend?flag=bindwithdrawaccount_3&sendtype=phone&num=${phoneNumber}`
    }
    if (flag === ESendPhoneCodeFlag.bindGrabPay) {
      uri = `api/verify/singlesend?flag=bindwithdrawaccount_4&sendtype=phone&num=${phoneNumber}`
    }
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
    countdown,
    sendPhoneCode: preSubmit(formik),
    formik,
  }
}

export const enum ESendPhoneCodeFlag {
  // 绑定手机号
  bind = 'bind',
  // 更新绑定手机号
  update = 'update',
  // 验证更新绑定手机号
  updateVerify = 'verify',
  // 验证修改登录密码
  resetPass = 'resetPass',
  // 绑定GCASH
  bindGcash = 'bindGcash',
  // 绑定 MAYA
  bindMaya = 'bindMaya',
  // 绑定 GrabPay
  bindGrabPay = 'bindGrabPay',
}

export interface ISendPhoneCode {
  phoneNumber?: string
}
