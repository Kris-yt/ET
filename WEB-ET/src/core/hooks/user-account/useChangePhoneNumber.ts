/*
 * @Date: 2024-08-08 09:35:47
 * @FilePath: /AS-WEB-3.5/src/core/hooks/user-account/useChangePhoneNumber.ts
 * @Description:
 */
import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useGlobal from '../useGlobal'
import useFormPreSubmit from '../useFormPreSubmit'

interface IProps {
  onScuccess?: () => void
  onVerifyCodeScuccess?: (token?: string) => void
}
export default ({ onScuccess, onVerifyCodeScuccess }: IProps) => {
  const { dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()
  const [token, setToken] = useState<string>()

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
    // setToken('88888')
    // onVerifyCodeScuccess && onVerifyCodeScuccess('888888')
    // return
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/verify/updateverify',
        method: 'POST',
        loading: true,
        data: {
          flag: 'initialVerify',
          sendtype: 'phone',
          updatetype: 'phone',
          code: code,
        },
        cb: (res: any) => {
          setToken(res.data.tokenSign)
          onVerifyCodeScuccess && onVerifyCodeScuccess(res.data.tokenSign)
        },
      }),
    )
  }

  const changePhoneFormik = useFormik({
    validateOnMount: true,
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required($t('请输入验证码')),
    }),
    onSubmit: (values) => {
      changeBindPhoneNumber({ code: values.code })
    },
  })

  /**
   * @description 更换手机号码
   * @param param0
   */
  const changeBindPhoneNumber = ({ code }) => {
    const storedValue = sessionStorage.getItem('bindedPhoneNumber')
    const num = storedValue ? JSON.parse(storedValue).num : null
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/verify/updateverify',
        method: 'POST',
        loading: true,
        data: {
          flag: 'updateVerify',
          sendtype: 'phone',
          code,
          num,
        },
        cb: () => {
          dispatch(
            ACTIONS.BASE.openToast({
              text: $t('Modify  phone number successfully'),
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
    changePhoneFormik,
    verifyCode: preSubmit(verifyCodeformik),
    changeBindPhoneNumber: preSubmit(changePhoneFormik),
  }
}

interface IVeryfyCode {
  code: string
  onScuccess?: () => void
  onVerifyCodeScuccess?: () => void
}
