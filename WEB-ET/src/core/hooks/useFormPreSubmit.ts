/*
 * @Date: 2024-08-07 19:35:37
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useFormPreSubmit.ts
 * @Description:
 */
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()

  const preSubmit = (formik: any) => {
    return async (...args) => {
      if (!formik.isValid) {
        const firstError = Object.values(formik.errors)[0]
        dispatch(
          ACTIONS.BASE.openToast({ type: 'error', text: firstError as string }),
        )
        return
      }
      formik.handleSubmit(...args)
    }
  }

  return {
    preSubmit,
  }
}
