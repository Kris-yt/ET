/*
 * @Date: 2024-07-31 16:41:02
 * @FilePath: /AS-WEB-3.5/src/core/reducers/types.d.ts
 * @Description:
 */
import { EKycState } from './enum'

export type TBase = {
  loading: {
    display: boolean
    text?: string | null
  }
  modal: {
    display: boolean
    title?: string
    content?: any
    actions?: Array<{
      type: 'default' | 'cancel'
      text: string
      keepOpen: boolean
      cb: () => void
    }>
  }
  toast: {
    types: 'info' | 'success' | 'error'
    text: string
    tirgger: number
  }
  settings?: {
    public_key: string
    default_promption_code: string
    [key: string]: any
  }
  route: {
    prev: string
    current: string
  }
}

export type TUser = {
  info?: {
    userid: number
    username: string
    binding_phone_info: string
    binding_email_info: string
    is_binding_phone: boolean
    is_binding_email: boolean
    kyc_status: EKycState
    phstore: string
    availablebalance: string
    registertime: string
    withdrawalAccounts: Array<any>
    [key: string]: any
  }
  kyc?: {
    id: string
    kyc_type_id: string
    picture_urls: string
    nationality: string
    birthday: string
    work: string
    birth_place: string
    permanent_address: string
    full_name: string
    first_name: string
    last_name: string
    middle_name: string
    gender: string
    income_source: string
    current_address: string
    status: string
    remark: string
    picture_list: []
  }
  vip?: {
    level: number
    [key: string]: any
  }
  type?: [
    {
      id: string
      name: string
    },
  ]
}

export type TStore = {
  base: TBase
  user: TUser
}

export default TStore
