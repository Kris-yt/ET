/*
 * @Date: 2024-08-12 10:26:57
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useRegister.ts
 * @Description:
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useGlobal from './useGlobal'
import useFormPreSubmit from './useFormPreSubmit'
import JSEncrypt from 'jsencrypt'
export default () => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const regExp6To16 = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/ //密码长度为6-16位，且必须同时包含字母和数字
  const regExpAlphanumeric = /^[a-zA-Z0-9][a-zA-Z0-9]*$/ // 包含只能字母和数字，以字母或数字开头
  const public_key =
    useSelector((state) => state.base.settings?.public_key) || ''
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      smscode: '',
      password: '',
      passwordconfirm: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required($t('请输入新密码'))
        .matches(regExp6To16, $t('请输入由字母和数字组成的6-16位字符'))
        .matches(regExpAlphanumeric, $t('请输入由字母和数字组成的6-16位字符')),
      passwordconfirm: Yup.string()
        .required($t('请输入确认密码'))
        .oneOf([Yup.ref('password')], $t('两次输入密码不一致')),
    }),
    onSubmit: async (values) => {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(public_key)
      dispatch(
        ACTIONS.USER.findForgetPass({
          username: values.username,
          newpass: encrypt.encrypt(values.password) || '',
          flag: 'changepassword',
          smscode: values.smscode,
          cb: (res: any) => {
            if (res.status !== 10000) {
              dispatch(
                ACTIONS.BASE.openToast({ type: 'error', text: res.message }),
              )
              return
            }
            dispatch(
              ACTIONS.BASE.openToast({
                text: $t('修改密码成功'),
                type: 'success',
              }),
            )
          },
        }),
      )
    },
  })
  return {
    formik,
    submitPassword: preSubmit(formik),
  }
}
