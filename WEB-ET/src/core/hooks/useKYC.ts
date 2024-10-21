/*
 * @Date: 2024-08-19 14:50:32
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useKYC.ts
 * @Description:
 */
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import useFormPreSubmit from './useFormPreSubmit'
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const navigate = useNavigate()
  const { preSubmit } = useFormPreSubmit()
  const today = new Date()
  const minimumAgeDate = new Date(
    today.getFullYear() - 21,
    today.getMonth(),
    today.getDate(),
  )
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      kyc_type_id: '1',
      file: [],
      holding_id_photo: [],
      nationality: '',
      birthday: '',
      work: '',
      birth_place: '',
      permanent_address: '',
      full_name: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      income_source: '',
      current_address: '',
    },
    validationSchema: Yup.object({
      kyc_type_id: Yup.string().required($t('请选择证件类型')),
      file: Yup.array().required($t('请上传证件')),
      holding_id_photo: Yup.array().required($t('请上传手持证件照')),
      nationality: Yup.string().required($t('请选择国家')),
      birthday: Yup.date()
        .required($t('请选择出生日期'))
        .max(minimumAgeDate, $t('年龄不能小于21岁')), // 设置最小年龄的日期,
      work: Yup.string().required($t('请选择职业')),
      birth_place: Yup.string().required($t('请选择出生地')),
      permanent_address: Yup.string().required($t('请选择户籍地')),
      first_name: Yup.string().required($t('请填写姓名')),
      last_name: Yup.string().required($t('请填写姓名')),
      gender: Yup.string().required($t('请选择性别')),
      income_source: Yup.string().required($t('请选择收入来源')),
      current_address: Yup.string().required($t('请填写联络地址')),
    }),
    onSubmit: async (values) => {
      dispatch(
        ACTIONS.BASE.commonRequest({
          uri: 'api/kyc/saveinfo',
          method: 'POST',
          loading: true,
          data: {
            kyc_type_id: values.kyc_type_id,
            file: values.file,
            holding_id_photo: values.holding_id_photo,
            nationality: values.nationality,
            birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
            work: values.work,
            birth_place: values.birth_place,
            permanent_address: values.permanent_address,
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
            gender: values.gender,
            income_source: values.income_source,
            current_address: values.current_address,
          },
          cb: (res) => {
            if (res.status !== 10000) {
              dispatch(
                ACTIONS.BASE.openToast({ type: 'error', text: res.message }),
              )
              return
            }
            dispatch(
              ACTIONS.BASE.openToast({
                type: 'success',
                text: $t('提交成功'),
              }),
            )
            dispatch(ACTIONS.USER.getProfile({}))
            navigate('/user/security')
          },
        }),
      )
    },
  })

  const getPersonalInfo = () => {
    dispatch(ACTIONS.USER.getKYCInfo({}))
  }

  return {
    getPersonalInfo,
    formik,
    submit: preSubmit(formik),
  }
}
