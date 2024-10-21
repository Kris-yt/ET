/*
 * @Date: 2024-07-31 18:40:42
 * @FilePath: /AS-WEB-3.5/src/core/services/network/types.d.ts
 * @Description:
 */
import { ERequestMethods } from './enum'

// 请求对象
export interface IRequest {
  url: string
  method: ERequestMethods
  nonce: string
  data?: any
  params?: any
  headers?: { [any: string]: string } | null
}

export interface ICache {
  expires: number // 缓存有效时间（秒）
  forward: boolean // 有缓存时，是否在使用缓存后仍然进行请求
  isUserBind?: boolean // 缓存是否绑定 USER，切换USER则缓存失效
  cacheClear?: boolean // 废弃当前缓存
}

/**
 * 请求构造函数
 * @param key 地址对应的KEY
 * @param urlParams URL上的参数
 * @param method 请求方法
 * @param loading 是否需要LOADING
 * @param cache 是否缓存 - expires：缓存有效时间（秒）forward：使用缓存后，是否仍然发起请求更新最新资源
 * @param timeout 自定义超时时间 单位 s
 * @param timeoutCallback 自定义超时回调函数
 * @param maxRetry 最大重试次数
 */
export interface IPayload {
  key: string
  method: ERequestMethods
  urlParams?: Array<string | number>
  params?: any
  data?: any
  loading?: boolean | string
  cache?: ICache
  timeout?: number
  timeoutCallback?: Function
  maxRetry?: number
  mock?: Function | Object
  cb?: Function
  headers?: { [any: string]: string } | null
  dataFix?: Array<{ key: string; old: number | string; new: number | string }>
  fieldFix?: Array<{ old: string; new: string }>
  picks?: Array<string>
}
