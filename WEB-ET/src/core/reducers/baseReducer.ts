/*
 * @Date: 2024-08-03 09:54:50
 * @FilePath: /AS-WEB-3.5/src/core/reducers/baseReducer.ts
 * @Description:
 */

import TYPES from '@constants/types'
import initialState from './initialState'

export default function base(state = initialState.base, action: any) {
  switch (action.type) {
    // 打开 LOADING
    case TYPES.BASE.LOADING_OPEN: {
      const update = {
        display: true,
        text: action.text || null,
      }
      return { ...state, loading: update }
    }
    // 关闭 LOADING
    case TYPES.BASE.LOADING_CLOSE: {
      const update = {
        display: false,
        text: '',
      }
      return { ...state, loading: update }
    }
    // 打开 Toast
    case TYPES.BASE.TOAST_OPEN: {
      const update = {
        types: action.types,
        text: action.text,
      }
      return { ...state, toast: { ...update, tirgger: Date.now() } }
    }
    // 打开弹出层 MODAL
    case TYPES.BASE.MODAL_OPEN: {
      const { title, content, actions, type, top } = action.options
      const update = {
        display: true,
        title,
        content,
        top,
        type,
        actions,
      }
      return { ...state, modal: update }
    }
    // 关闭弹出层 MODAL
    case TYPES.BASE.MODAL_CLOSE: {
      const update = {
        display: false,
      }
      return { ...state, modal: update }
    }
    // 系统设置
    case TYPES.BASE.GET_SETTINGS: {
      return { ...state, settings: { ...action.res } }
    }
    // 记录路由信息
    case TYPES.BASE.RECORD_ROUTE: {
      return { ...state, route: action.route }
    }
    // 清空导航数据
    default:
      return state
  }
}
