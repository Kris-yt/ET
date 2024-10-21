/*
 * @Date: 2024-08-08 14:53:16
 * @FilePath: /AS-WEB-3.5/src/core/hooks/user-account/useChangePassword.ts
 * @Description:
 */
import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import JSEncrypt from 'jsencrypt'
import useGlobal from '../useGlobal'
import useFormPreSubmit from '../useFormPreSubmit'

interface IProps {
  onScuccess?: () => void
}
export default ({ onScuccess }: IProps) => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const [token, setToken] = useState()

  const public_key =
    useSelector((state) => state.base.settings?.public_key) || ''

  const verifyCodeformik = useFormik({
    validateOnMount: true,
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required($t('请输入验证码')),
    }),
    onSubmit: (values) => {
      verifyCode({ code: values.code })
    },
  })

  /**
   * @description: 验证验证码
   * @param param0
   */
  const verifyCode = ({ code }: IVeryfyCode) => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/verify/singleverify',
        method: 'POST',
        loading: true,
        data: {
          flag: 'resetloginpassword',
          sendtype: 'phone',
          istokenreturn: true,
          has_securitypwd: false,
          code: code,
        },
        cb: (res: any) => {
          setToken(res.data.tokenSign)
        },
      }),
    )
  }
  const regExp6To16 = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/ //密码长度为6-16位，且必须同时包含字母和数字
  const regExpAlphanumeric = /^[a-zA-Z0-9][a-zA-Z0-9]*$/ // 包含只能字母和数字，以字母或数字开头
  const changePassworkFormik = useFormik({
    validateOnMount: true,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required($t('请输入新密码'))
        .matches(regExp6To16, $t('请输入由字母和数字组成的6-16位字符'))
        .matches(regExpAlphanumeric, $t('请输入由字母和数字组成的6-16位字符')),
      confirmPassword: Yup.string()
        .required($t('请输入确认密码'))
        .oneOf([Yup.ref('password')], $t('两次输入密码不一致')),
    }),
    onSubmit: (values) => {
      changePassword({
        password: values.password,
        code: verifyCodeformik.values.code,
      })
    },
  })

  /**
   * @description 重设密码
   * @param param0
   */
  const changePassword = ({ password, code }: IChangePassword) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(public_key)

    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/account/verifychangepassword',
        method: 'POST',
        loading: true,
        data: {
          newpass: encrypt.encrypt(password) || '',
          passtype: 'login',
          token: token,
          smscode: code,
        },
        cb: () => {
          dispatch(
            ACTIONS.BASE.openToast({
              text: $t('修改登录密码成功'),
              type: 'success',
            }),
          )
          dispatch(ACTIONS.USER.getProfile({}))
          onScuccess && onScuccess()
        },
      }),
    )
  }

  return {
    token,
    verifyCodeformik,
    changePassworkFormik,
    verifyCode: preSubmit(verifyCodeformik),
    changePassword: preSubmit(changePassworkFormik),
  }
}

interface IVeryfyCode {
  code: string
  onScuccess?: () => void
}

interface IChangePassword {
  code: string
  password: string
}
