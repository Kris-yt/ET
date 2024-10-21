/*
 * @Date: 2024-08-06 11:34:17
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useVerificqtionlogin.ts
 * @Description: 验证码登录hook
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import JSEncrypt from 'jsencrypt'
import useGlobal from './useGlobal'
import useEventEmitter from './useEventEmitter'
import useFormPreSubmit from './useFormPreSubmit'
import CONFIGS from '@this/configs'

export default () => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()

  const public_key =
    useSelector((state) => state.base.settings?.public_key) || ''
  const { emit: emitLoginSuccess } = useEventEmitter('loginSuccess')
  const phoneTip = $t(`手机号码格式不正确`)
  const verificationformik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      smscode: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required($t('手机号码不能为空'))
        .matches(/^(?:\+63|0)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, phoneTip),
      smscode: Yup.string().required($t('验证码不能为空')),
    }),
    onSubmit: async (values) => {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(public_key)
      const user: any = {
        username: values.username,
        smscode: values.smscode,
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
    dispatch(ACTIONS.USER.getProfile({}))
  }

  return {
    verificationformik,
    submitVerificationSignIn: preSubmit(verificationformik),
    handleSignInCallback,
  }
}
