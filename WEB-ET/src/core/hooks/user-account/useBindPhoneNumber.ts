/*
 * @Date: 2024-08-07 19:17:11
 * @FilePath: /AS-WEB-3.5/src/core/hooks/user-account/useBindPhoneNumber.ts
 * @Description:
 */
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useGlobal from '../useGlobal'
import useFormPreSubmit from '../useFormPreSubmit'

interface IProps {
  onScuccess?: () => void
}
export default ({ onScuccess }: IProps) => {
  const { dispatch, ACTIONS } = useGlobal()
  const { preSubmit } = useFormPreSubmit()

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required($t('请输入验证码')),
    }),
    onSubmit: (values) => {
      bindPhoneNumber(values.code)
    },
  })

  const bindPhoneNumber = (code: string) => {
    const storedValue = sessionStorage.getItem('bindedPhoneNumber')
    const num = storedValue ? JSON.parse(storedValue).num : null
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/verify/singleverify',
        method: 'POST',
        loading: true,
        data: {
          flag: 'bind',
          sendtype: 'phone',
          istokenreturn: true,
          has_securitypwd: false,
          code: code,
          num,
        },
        cb: () => {
          dispatch(
            ACTIONS.BASE.openToast({ text: $t('绑定成功'), type: 'success' }),
          )
          dispatch(ACTIONS.USER.getProfile({}))
          onScuccess && onScuccess()
        },
      }),
    )
  }

  return {
    formik,
    bindPhoneNumber: preSubmit(formik),
  }
}
