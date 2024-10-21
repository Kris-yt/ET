import { concat } from 'lodash'
import TYPES from '@constants/types'
import { ERequestMethods, IPayload } from '@/core/middleware/types.d'
import { IResBase, IResAPI } from './types.d'

// 打开LOADING
export const openLoading = ({
  text = '',
}: { text?: String } = {}): IResBase => ({
  type: TYPES.BASE.LOADING_OPEN,
  text,
})

// 关闭LOADING
export const closeLoading = (): IResBase => ({
  type: TYPES.BASE.LOADING_CLOSE,
})

// 关闭弹出层
export const closeModal = (): IResBase => ({
  type: TYPES.BASE.MODAL_CLOSE,
})

// 打开Toast
interface IOpenToast {
  text: string
  type?: 'info' | 'success' | 'error'
}
export const openToast = ({
  text = '',
  type = 'info',
}: IOpenToast): IResBase => ({
  type: TYPES.BASE.TOAST_OPEN,
  types: type,
  text,
  duration: 5000, // 显示5秒后自动关闭
})

// 打开弹出层
interface IAlert {
  title?: string
  content: string | object | Array<string> // HTML 文本内容，可以是字符串，也可以是DOM
  btnText?: string
  type?: number
  keepOpen?: boolean // 点击按钮后保持打开
  cb?: Function
  className?: string
}
export const openAlert = ({
  title = $t('温馨提示'),
  content,
  className = '',
  keepOpen = false,
  btnText = $t('我知道了'),
  cb,
}: IAlert): IResBase => ({
  type: TYPES.BASE.MODAL_OPEN,
  options: {
    title,
    content,
    className,
    actions: [
      {
        type: 'default',
        text: btnText,
        keepOpen,
        cb,
      },
    ],
  },
})

// 打开确认框
interface IConfirm extends IAlert {
  actions: Array<{
    text: string
    type?: 'default' | 'cancel'
    keepOpen?: boolean // 点击按钮后保持打开
    cb?: Function
  }>
}
export const openConfirm = ({
  title = 'Confirm',
  content,
  actions,
}: IConfirm): IResBase => ({
  type: TYPES.BASE.MODAL_OPEN,
  options: {
    title,
    content,
    actions:
      actions.length === 1
        ? concat({ text: $t('取消'), type: 'cancel' }, actions)
        : actions,
  },
})

/**
 * @description: 通用请求，仅用于一次性请求，动态请求，并且不操作store
 * @param {string} uri
 */
interface ICommonRequest extends IPayload {
  apiType?: 'rest' | 'classic'
  uri: string
}
export const commonRequest = ({
  apiType = 'rest',
  uri,
  cache,
  data,
  method = ERequestMethods.GET,
  loading = false,
  ...params
}: ICommonRequest): IResAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: `${apiType}/common-request`,
    urlParams: [uri],
    data,
    cache,
    method,
    loading,
  },
  ...params,
})

// 获取基础配置
export const getSettings = (): IResAPI => ({
  type: TYPES.BASE.GET_SETTINGS,
  payload: {
    key: 'rest/get-settings',
    cache: { expires: 60 * 24 * 30, forward: true },
  },
})

export const recordRoute = (
  prevRoute: string,
  currentRoute: string,
): IResBase => ({
  type: TYPES.BASE.RECORD_ROUTE,
  route: {
    prev: prevRoute,
    current: currentRoute,
  },
})
