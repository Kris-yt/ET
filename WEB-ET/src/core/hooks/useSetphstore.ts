/*
 * @Date: 2024-09-14 15:12:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useDeposit.ts
 * @Description:
 */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useGlobal from './useGlobal'
import useFormPreSubmit from './useFormPreSubmit'
import { useNavigate } from 'react-router-dom'
export default () => {
  const navigate = useNavigate()
  const { preSubmit } = useFormPreSubmit()
  const { dispatch, ACTIONS } = useGlobal()
  const storeformik = useFormik({
    validateOnMount: true,
    initialValues: {
      phstore: '',
    },
    validationSchema: Yup.object({
      phstore: Yup.string().required($t('请选择实体店')),
    }),
    onSubmit: async (values) => {
      dispatch(
        ACTIONS.USER.setPHSTORE({
          phstore: values.phstore,
          cb: (res: any) => {
            if (res.status !== 10000) {
              dispatch(ACTIONS.BASE.openAlert({ content: res.msg }))
              return
            }
            dispatch(
              ACTIONS.BASE.openToast({
                text: $t('设置成功'),
                type: 'success',
              }),
            )
            dispatch(ACTIONS.USER.getProfile({}))
            navigate('/user/security')
          },
        }),
      )
    },
  })

  return {
    onSubmit: preSubmit(storeformik),
    storeformik,
  }
}
