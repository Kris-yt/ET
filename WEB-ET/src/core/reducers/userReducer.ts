/*
 * @Date: 2024-08-06 10:51:10
 * @FilePath: /AS-WEB-3.5/src/core/reducers/userReducer.ts
 * @Description:
 */

import TYPES from '@constants/types'
import initialState from './initialState'
import _ from 'lodash'

export default function user(state = initialState.user, action: any) {
  switch (action.type) {
    // 设置TOKEN
    case TYPES.USER.SET_TOKEN: {
      Store.localStorage.set('auth', action.token)
      sessionStorage.setItem('token', action.token)
      return { ...state, token: action.token }
    }
    // 个人信息
    case TYPES.USER.GET_PROFILE: {
      return { ...state, info: action.res }
    }
    // kycType
    case TYPES.USER.GET_KYC_TYPE: {
      return { ...state, type: action.res }
    }
    // KYC 信息
    case TYPES.USER.GET_KYC_INFO: {
      return { ...state, kyc: action.res }
    }
    // VIP 信息
    case TYPES.USER.GET_VIP_INFO: {
      return { ...state, vip: action.res }
    }
    // 余额 信息
    case TYPES.USER.GET_BALANCE: {
      const info = _.cloneDeep<any>(state.info)
      info.availablebalance = action.res.balance
      return { ...state, info }
    }
    case TYPES.USER.LOGOUT: {
      Store.localStorage.remove('auth')
      Store.localStorage.remove('userProfile')
      Store.localStorage.remove('sessionId')
      return {
        ...initialState.user,
        info: {},
      }
    }
    default:
      return state
  }
}
