/*
 * @Date: 2024-08-06 18:02:45
 * @FilePath: /AS-WEB-3.5/src/core/actions/userAction.ts
 * @Description:
 */
import { ERequestMethods } from '@/core/middleware/types.d'
import TYPES from '@constants/types'
import { IResAPI, IResBase, IProps } from './types.d'

export const login = ({ data, cb }: IProps): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/login',
    data,
    method: ERequestMethods.POST,
    loading: true,
  },
  passError: true,
  cb,
})

interface IRegister extends IProps {
  code: string
}
export const register = ({ data, code, cb }: IRegister): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/register',
    urlParams: [code],
    data,
    method: ERequestMethods.POST,
    loading: true,
  },
  cb,
})

// 刷SESSION
export const getNewSession = ({ cb }: IProps): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'rest/get-session' },
  cb: (res: any) => {
    // 每10分钟自动过期一次
    Store.localStorage.set('sessionId', res.data.sessid, 600)
    cb && cb(res)
  },
})

export const getProfile = ({ cb, loading = true }: IProps): IResAPI => ({
  type: TYPES.USER.GET_PROFILE,
  payload: { key: 'rest/profile', loading },
  continue: ({ dispatch }) => {
    dispatch(getNewSession({}))
    dispatch(getKYCInfo({}))
    dispatch(getVipInfo({}))
    dispatch(getKYCType({}))
  },
  cb,
})
export const getKYCType = ({ cb }: IProps): IResAPI => ({
  type: TYPES.USER.GET_KYC_TYPE,
  payload: { key: 'rest/get-kyc-type' },
  cb,
})
export const getKYCInfo = ({ cb }: IProps): IResAPI => ({
  type: TYPES.USER.GET_KYC_INFO,
  payload: { key: 'rest/get-kyc' },
  cb,
})

export const getVipInfo = ({ cb }: IProps): IResAPI => ({
  type: TYPES.USER.GET_VIP_INFO,
  payload: {
    key: 'rest/get-vip',
    cache: { expires: 5, forward: true, isUserBind: true },
  },
  cb,
})

export const logout = (): IResBase => ({
  type: TYPES.USER.LOGOUT,
})
interface IFindForgetPass extends IProps {
  flag: any
  username: any
  newpass: any
  smscode: any
}
export const findForgetPass = ({
  flag,
  username,
  newpass,
  smscode,
  cb,
  ...paylad
}: IFindForgetPass): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/find-forget-pass-by-phone',
    data: { flag, username, newpass, smscode, ...paylad },
    method: ERequestMethods.POST,
    loading: true,
  },
  cb,
})

// 获取所有充值渠道
interface IGetAllPaymentChannel {
  cb: Function
  loading?: boolean
  cacheClear?: boolean
}
export const getAllPaymentChannel = ({
  cb,
  loading = false,
  cacheClear = false,
}: IGetAllPaymentChannel): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/get-all-pay-channel',
    loading,
    cache: { expires: 30, forward: true, isUserBind: true, cacheClear },
  },
  dataFix: [{ key: 'status', old: 0, new: 10000 }],
  fieldFix: [{ old: 'msg', new: 'message' }],
  passError: true,
  cb,
})

// 存款-提交充值订单
interface ISubmitOdinDepositOrder {
  bid?: any
  phstore?: number
  cb: Function
  amount: any
  loading?: boolean
}
export const submitOdinDepositOrder = ({
  bid,
  amount,
  phstore,
  cb,
  loading = true,
}: ISubmitOdinDepositOrder): IResAPI => {
  return {
    type: TYPES.BASE.HTTP_ONLY,
    payload: {
      key: 'rest/submit-recharge-order',
      urlParams: [bid],
      data: { amount, phstore },
      method: ERequestMethods.POST,
      loading,
    },
    dataFix: [{ key: 'status', old: 0, new: 10000 }],
    fieldFix: [{ old: 'msg', new: 'message' }],
    cb,
  }
}
export interface IGetWithdrawInfo {
  cb: Function
  loading?: boolean
  check?: string
}
export const getWithdrawInfo = ({
  cb,
  loading = false,
  check = (window as any).SEC_CODE,
}: IGetWithdrawInfo): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'rest/withdrawal-list', loading, urlParams: [check] },
  cb,
})
interface IGoWithdraw {
  cb?: Function
  loading?: boolean
  data: any
}
// 提款提交
export const goWithdraw = ({ data, cb, loading = true }: IGoWithdraw) => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/withdrawal',
    method: ERequestMethods.POST,
    data: { ...data },
    loading,
  },
  cb,
})

interface IGetUserBalance {
  cb?: Function
  loading?: boolean
}
//刷新余额
export const getBalance = ({
  cb,
  loading = true,
}: IGetUserBalance): IResAPI => ({
  type: TYPES.USER.GET_BALANCE,
  payload: { key: 'rest/get-balance', loading },
  cb,
})

// 获取未完成活动流水详情
interface IGetUnfinishedActivityDetail {
  cb: Function
  loading?: boolean
}
export const getUnfinishedActivityDetail = ({
  cb,
  loading = true,
}: IGetUnfinishedActivityDetail) => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/get-activity-awardrecord',
    loading,
  },
  cb,
})
interface ISetPhStore {
  cb?: Function
  loading?: boolean
  phstore: string | number
}
// 设置实体地址
export const setPHSTORE = ({ phstore, cb, loading = true }: ISetPhStore) => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'rest/set-phstore',
    method: ERequestMethods.POST,
    data: { phstore },
    loading,
  },
  cb,
})
// 提款-获取可提款额度
export const getWithdrawQuota = ({
  cb,
  loading = false,
}: IGetWithdrawInfo) => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'rest/withdrawal-quota', loading },
  cb,
})

// 提款-STEP1获取提现渠道详情
interface IWithdrawStep1 {
  type: string
  cb?: Function
  loading?: boolean
}
export const withdrawStep1 = ({
  type,
  cb,
  loading = true,
}: IWithdrawStep1) => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'rest/withdrawal-step1', urlParams: [type], loading },
  passError: true,
  cb,
})
