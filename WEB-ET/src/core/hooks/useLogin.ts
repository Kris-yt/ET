/*
 * @Date: 2024-08-06 11:34:17
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useLogin.ts
 * @Description:账号密码登录
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import JSEncrypt from 'jsencrypt'
import md5 from 'md5'
import useGlobal from './useGlobal'
import useEventEmitter from './useEventEmitter'
import useFormPreSubmit from './useFormPreSubmit'
import CONFIGS from '@this/configs'
import dayjs from 'dayjs'
export default () => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()

  const public_key =
    useSelector((state) => state.base.settings?.public_key) || ''
  const { emit: emitLoginSuccess } = useEventEmitter('loginSuccess')
  const { emit: emitForceSuccess } = useEventEmitter('openForce')
  const { emit: emitSuggestSuccess } = useEventEmitter('openSuggest')

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(6, $t('用户名不能小于6位'))
        .required($t('用户名不能为空')),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(public_key)
      const user: any = {
        username: values.username,
        password:
          values.password &&
          md5('d41d8cd98f00b204e9800998ecf8427e' + md5(values.password)),
        loginpass: values.password && encrypt.encrypt(values.password),
        grant_type: 'login',
        client_id: CONFIGS.CLIENT_ID,
        device_type: 'h5',
        device_id: 123,
      }
      dispatch(ACTIONS.USER.login({ data: user, cb: handleSignInCallback }))
    },
  })

  // 登录回调
  const handleSignInCallback = (res: any) => {
    if (res.status !== 10000) {
      dispatch(ACTIONS.BASE.openToast({ type: 'error', text: res.message }))
      return
    }
    emitLoginSuccess()
    dispatch(
      ACTIONS.BASE.openToast({
        text: $t('登录成功'),
        type: 'success',
      }),
    )
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
          } else if (Math.abs(dayDiff) > 3 && res.data?.kyc_status !== 1) {
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
          Store.localStorage.set('paymentlist', res?.data?.chongzhiList || [])
          Store.localStorage.set(
            'numberlist',
            res.data?.chongzhiList[0]?.payChannelList[0]?.recommendMoney || [],
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
  }

  return {
    formik,
    submitSignIn: preSubmit(formik),
    handleSignInCallback,
  }
}
