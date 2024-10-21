/*
 * @Date: 2024-08-12 10:26:57
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useRegister.ts
 * @Description:
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useEventEmitter from './useEventEmitter'
import useGlobal from './useGlobal'
import useFormPreSubmit from './useFormPreSubmit'
import useEventMitt from './useEventEmitter'
import dayjs from 'dayjs'
export default () => {
  const { emit } = useEventMitt('registerSuccess')
  const { dispatch, ACTIONS, useSelector } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const phoneTip = $t(`手机号码格式不正确`)
  const promotionCode = useSelector(
    (state) => state.base.settings?.default_promption_code,
  )
  const { emit: emitLoginSuccess } = useEventEmitter('loginSuccess')
  const { emit: emitForceSuccess } = useEventEmitter('openForce')
  const { emit: emitSuggestSuccess } = useEventEmitter('openSuggest')
  const code =
    new URLSearchParams(window.location.search).get('code') ||
    promotionCode ||
    ''
  const registerformik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      smscode: '',
      phstore: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required($t('手机号码不能为空'))
        .matches(/^(?:\+63|0)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, phoneTip),
      smscode: Yup.string().required($t('验证码不能为空')),
      phstore: Yup.string().required($t('实体站不能为空')),
    }),
    onSubmit: async (values) => {
      const user = {
        username: values.username,
        smscode: values.smscode,
        phstore: values.phstore,
      }
      dispatch(
        ACTIONS.USER.register({
          data: user,
          code,
          cb: (res: any) => {
            if (res.status !== 10000) {
              dispatch(
                ACTIONS.BASE.openToast({
                  type: 'error',
                  text: res.error.message,
                }),
              )
              return
            }
            emitLoginSuccess()
            dispatch(
              ACTIONS.BASE.openToast({
                text: $t('注册成功'),
                type: 'success',
              }),
            )
            emit()
            Store.localStorage.set('auth', res.data.token)
            Store.localStorage.set('sessionId', res.data.cookie.sessid, 600)
            dispatch(
              ACTIONS.USER.getProfile({
                cb: (res: any) => {
                  const inputDate = dayjs(res.data.registertime) //传入日期
                  const currentDate = dayjs().startOf('day')
                  // 计算日期差
                  const dayDiff = inputDate.diff(currentDate, 'day')
                  if (
                    Math.abs(dayDiff) >= 0 &&
                    Math.abs(dayDiff) <= 3 &&
                    res.data?.kyc_status !== 1
                  ) {
                    emitSuggestSuccess()
                  } else if (
                    Math.abs(dayDiff) > 3 &&
                    res.data?.kyc_status !== 1
                  ) {
                    emitForceSuccess()
                  } else {
                    return
                  }
                },
              }),
            )
            dispatch(
              ACTIONS.USER.getAllPaymentChannel({
                loading: false,
                cacheClear: false,
                cb: (res: any) => {
                  if (res.status !== 10000) {
                    dispatch(ACTIONS.BASE.openAlert({ content: res.msg }))
                    return
                  }
                  Store.localStorage.set(
                    'paymentlist',
                    res.data?.chongzhiList || [],
                  )
                  Store.localStorage.set(
                    'numberlist',
                    res.data?.chongzhiList[0]?.payChannelList[0]
                      ?.recommendMoney || [],
                  )
                  Store.localStorage.set(
                    'loadmin',
                    res.data?.chongzhiList[0]?.payChannelList[0]?.loadmin || '',
                  )
                  Store.localStorage.set(
                    'loadmax',
                    res.data?.chongzhiList[0]?.payChannelList[0]?.loadmax || '',
                  )
                  Store.localStorage.set(
                    'bid',
                    res.data?.chongzhiList[0]?.payChannelList[0]?.bid || '',
                  )
                },
              }),
            )
          },
        }),
      )
    },
  })

  return {
    registerformik,
    submitRegister: preSubmit(registerformik),
  }
}
