/*
 * @Date: 2024-10-08 15:37:31
 * @FilePath: /AS-WEB-3.5/src/core/hooks/user-account/useBindWithdrawAccount.ts
 * @Description:
 */
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useGlobal from '../useGlobal'
import useSendPhoneCode from '../useSendPhoneCode'
import { useLocation } from 'react-router-dom'
import useFormPreSubmit from '../useFormPreSubmit'

interface IProps {
  type: EBindAccountType
  onBindSuccess: () => void
}
export default ({ type, onBindSuccess }: IProps) => {
  const accountBindTypeMap: any = {
    [EBindAccountType.GCash]: 'bindGcash',
    [EBindAccountType.GrabPay]: 'bindGrabPay',
    [EBindAccountType.MayaPay]: 'bindMaya',
  }

  const {
    sendPhoneCode,
    countdown,
    formik: formikPhone,
  } = useSendPhoneCode({ flag: accountBindTypeMap[type] })

  const { state } = useLocation()
  const { preSubmit } = useFormPreSubmit()
  const { dispatch, ACTIONS } = useGlobal()

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      validcode: '',
    },
    validationSchema: Yup.object({
      validcode: Yup.string().required($t('请输入验证码')),
    }),
    onSubmit: (values) => {
      bindAccount(values.validcode)
    },
  })

  const bindAccount = (validcode: string) => {
    const data = {
      type,
      check: state?.token,
      number: `09${formikPhone.values.phoneNumber}`,
      validcode,
    }
    if (!formikPhone.values.phoneNumber) {
      dispatch(ACTIONS.BASE.openToast({ text: $t('请输入手机号码') }))
      return
    }
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/withdrawal/account/create',
        method: 'POST',
        data,
        cb: () => {
          dispatch(
            ACTIONS.BASE.openToast({ text: $t('绑定成功'), type: 'success' }),
          )
          dispatch(ACTIONS.USER.getProfile({}))
          onBindSuccess()
        },
      }),
    )
  }

  return {
    formik,
    formikPhone,
    submit: preSubmit(formik),
    sendPhoneCode,
    countdown,
  }
}

export enum EBindAccountType {
  GCash = '2',
  GrabPay = '4',
  MayaPay = '3',
}
