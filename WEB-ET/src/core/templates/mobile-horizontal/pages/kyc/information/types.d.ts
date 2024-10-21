/*
 * @Date: 2024-08-06 11:19:44
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/information/types.d.ts
 * @Description:
 */
export interface IProps {}

type TFieldProps = {
  name: string
  field:
    | 'birthday'
    | 'nationality'
    | 'work'
    | 'birth_place'
    | 'permanent_address'
    | 'full_name'
    | 'gender'
    | 'income_source'
    | 'current_address'
  position: 'left' | 'right'
}

// 字段组件属性
export interface IFieldProps {
  data: string
  kycstatus?: number
  setData: (value: any) => void
}
