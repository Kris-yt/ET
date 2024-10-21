/*
 * @Description: 请求中间件
 * @Author: Passion.KMG
 * @Date: 2023-12-13
 * @LastEditTime: 2024-08-21 12:01:20
 * @LastEditors: Please set LastEditors
 */
import _ from 'lodash'
import { Dispatch } from 'redux'
import axios from 'axios'
import md5 from 'md5'
import { getURL } from '@apis/index'
import ACTIONS from '@actions/index'
import urlSign from '@utlis/urlSign'
import type { IPayload, IRequest } from './types.d'
import { ERequestMethods, EResponseErrors } from './enum'

export class HTTP {
  private request: IRequest

  private cache: IPayload['cache'] | null

  private loading: boolean | string

  private key: string

  private dispatch: Dispatch

  private timeout: number

  private picks: Array<any>

  private timeoutCallback: Function | undefined

  private retry: number

  private maxRetry: number

  private callback: Function

  private dataFix: IPayload['dataFix']

  private fieldFix: IPayload['fieldFix']

  constructor(_params: IPayload, dispatch: Dispatch) {
    const {
      key = '',
      urlParams = [],
      params = null,
      data = null,
      method = ERequestMethods.GET,
      loading = false,
      cache = null,
      timeout = 30,
      timeoutCallback = undefined,
      maxRetry = 1000,
      headers = null,
      dataFix = [],
      fieldFix = [],
      picks = [],
      cb = () => {},
    } = _params
    this.request = {
      url: getURL(key, urlParams),
      data,
      params,
      method,
      headers,
      nonce: this.nonceKey(key),
    }
    this.key = key
    this.loading = loading
    this.dispatch = dispatch
    this.cache = cache
    this.timeout = timeout
    this.timeoutCallback = timeoutCallback
    this.maxRetry = maxRetry
    this.retry = 0
    this.dataFix = dataFix
    this.fieldFix = fieldFix
    this.callback = cb
    this.picks = picks
  }

  /**
   * 发送请求
   * @param callback 回调函数
   */
  public sendHttp = ({
    callback,
    mock,
  }: {
    callback: Function
    mock?: any
  }) => {
    // 测试数据
    if (mock) {
      let mockRes = { ...mock }
      try {
        mockRes = this.fieldFixCheck(mockRes)
        mockRes = this.dataFixCheck(mockRes)
        mockRes = this.restCheck(mockRes)
        mockRes = this.classicCheck(mockRes)
        console.log('#### USING MOCK DATA:', mockRes)
        callback(mockRes)
      } catch (e) {
        console.log('#### MOCK DATA CATCH ERROR! ####')
      }
      return
    }
    // 正常请求
    this.callback = callback
    if (this.loading) {
      this.dispatch(
        ACTIONS.BASE.openLoading({
          text: typeof this.loading === 'string' ? this.loading : '',
        }),
      )
    }
    const domain =
      localStorage.getItem('__debug_domain__') ||
      (__DEV__ ? false : process.env.DOMAIN) ||
      '/'
    const data = _.includes(['POST', 'PUT', 'DELETE'], this.request.method)
      ? { ...this.request.data, nonce: this.request.nonce }
      : null

    const { sign, signTs } = urlSign(this.request.url)

    const headers = {
      'Content-Type': 'application/vnd.sc-api.v1.json',
      Authorization: Store.localStorage.get('auth')
        ? 'bearer ' + Store.localStorage.get('auth')
        : 'guestMode',
      'Cache-Control': 'no-cache',
      accessToken: Store.localStorage.get('auth'),
      'Accept-Language': 'zh',
      'App-RNID': '87jumkljo',
      'X-Sign1': sign,
      'X-Sign1-Ts': signTs,
    }
    // 中断前一次未完成的请求
    GlobalVar.get('REQUEST_CANCLE_TOKEN')
    if (
      GlobalVar.get('REQUEST_CANCLE_TOKEN') &&
      typeof GlobalVar.get('REQUEST_CANCLE_TOKEN')[this.request.url] ===
        'function'
    ) {
      GlobalVar.get('REQUEST_CANCLE_TOKEN')[this.request.url](
        `--新请求【${this.key}】已发出--`,
      )
    }
    const t = this
    const { CancelToken } = axios
    // 去请求
    axios({
      url: `${domain}${this.request.url}`,
      method: this.request.method,
      data: data,
      params: this.request.params,
      headers: this.request.headers
        ? { ...headers, ...this.request.headers }
        : headers,
      timeout: this.timeout * 1000,
      cancelToken: new CancelToken((c) => {
        GlobalVar.set('REQUEST_CANCLE_TOKEN', {
          ...GlobalVar.get('REQUEST_CANCLE_TOKEN'),
          [t.request.url]: c,
        })
      }),
    })
      .then((res: any) => res.data)
      .then(this.fieldFixCheck)
      .then(this.dataFixCheck)
      .then(this.restCheck)
      .then(this.classicCheck)
      .then((res: any) => {
        if (this.loading) {
          this.dispatch(ACTIONS.BASE.closeLoading())
        }
        callback(res)
      })
      .catch(this.errorHandler)
  }

  // 获取是否缓存
  public isCache = () => !!this.cache

  // 获取缓存对象
  public getCache = () => this.cache

  // 获取缓存键值
  public cacheKey = () => md5(`${this.request.url}`).substr(0, 16)

  // 获取nonce - 后端防重复请求
  private nonceKey = (api: string) => md5(`${api}-${_.now()}-${_.random(999)}`)

  // 字段矫正（用于将不规范的字段转换成规范的字段）
  private fieldFixCheck = (res: any) => {
    if (!this.fieldFix || this.fieldFix.length === 0) {
      return res
    }
    const result = { ...res }
    _.each(this.fieldFix, (item: { old: string; new: string }): any => {
      if (_.isUndefined(res[item.old])) {
        return true
      }
      result[item.new] = res[item.old]
      delete result[item.old]
    })
    return result
  }

  // 数据矫正（用于将不规范的数据转换成规范的数据）
  private dataFixCheck = (res: any) => {
    if (!this.dataFix || this.dataFix.length === 0) {
      return res
    }
    let result = { ...res }
    _.each(this.dataFix, (item: any): any => {
      if (_.get(res, item.key) != item.old) {
        return true
      }
      result = _.set(res, item.key, item.new)
    })
    return result
  }

  // 错误检查
  private errorHandler = (error: any) => {
    // 关闭LOADING
    this.loading && this.dispatch(ACTIONS.BASE.closeLoading())
    if (axios.isCancel(error)) {
      if (__DEV__) {
        console.log('请求被取消：', error.message)
        console.log(`--新请求【${this.key}】已发出--`)
      }
      return
    }
    // 响应码错误
    if (error.response && error.response.status !== 200) {
      this.dispatch(
        ACTIONS.BASE.openToast({
          text: `${$t('网络错误')} - ${error.response.status} / ${md5(this.key).substr(0, 6)}`,
          type: 'error',
        }),
      )
      return
    }
    // 断网或超时，回调优先
    if (
      (_.includes(error.message, 'Network Error') ||
        _.includes(error.message, 'timeout')) &&
      this.timeoutCallback
    ) {
      this.timeoutCallback()
      return
    }
    // 超时
    if (_.includes(error.message, 'timeout')) {
      // GET请求自动重试
      if (this.request.method === 'GET') {
        // 到达最大重试次数
        if (this.retry == this.maxRetry) {
          return
        }
        // 重试提示
        if (this.retry < this.maxRetry) {
          this.dispatch(
            ACTIONS.BASE.openToast({
              text: `${$t('网络慢，重试中')}（${md5(this.key).substr(0, 4)}）`,
              type: 'error',
            }),
          )
          this.sendHttp({ callback: this.callback })
          this.retry++
        }
      }
      // POST, PUT 需要用户自主选择是否重新提交
      if (_.includes(['POST', 'PUT'], this.request.method)) {
        this.dispatch(
          ACTIONS.BASE.openConfirm({
            content: $t('网络慢未收到服务器应答，是否要重试？'),
            actions: [
              {
                text: $t('重试'),
                cb: () => this.sendHttp({ callback: this.callback }),
              },
            ],
          }),
        )
      }
    }
    // 登录超时错误，被踢下线，禁止登录等
    if (
      _.includes(error.message, EResponseErrors.NO_AUTH) ||
      _.includes(error.message, EResponseErrors.KICKED) ||
      _.includes(error.message, EResponseErrors.REJECT)
    ) {
      // 节流后的处理
      this.dispatch(
        ACTIONS.BASE.openToast({
          text: $t('登录已过期，请重新登录'),
          type: 'error',
        }),
      )
      Emitter('logout').emit({ popup: false })
      return
    }
    // 请求太频繁
    if (error.message === EResponseErrors.TOO_MANY_REQ) {
      this.dispatch(
        ACTIONS.BASE.openToast({
          text: $t('请求太频繁，请稍后再试'),
          type: 'error',
        }),
      )
      return
    }
    // 重复提交
    if (error.message === EResponseErrors.SAME_REQ) {
      return
    }
    // 其他错误
    throw Error(error.message)
  }

  // 新版RESTFUL登录超时等检查
  private restCheck = (res: any) => {
    // 非新版入口继续往后
    if (!_.includes(this.key, 'rest/')) {
      return res
    }
    if (res.status === 900001) {
      throw new Error(`${ResponseErrors.ALI_CAPTCHA}`)
    }
    if (res.status === 20217) {
      throw new Error(ResponseErrors.LOGINP_PASS_CHANGED)
    }
    // 登录超时 （70001：设备号拉黑）
    if (
      _.includes(
        [20101, 20102, 20103, 20111, 30018, 30003, 30713, 70001],
        res.status,
      )
    ) {
      throw new Error(`${ResponseErrors.NO_AUTH}||${res.message}`)
    }
    // 被踢下线
    if (res.status === 20106) {
      throw new Error(`${ResponseErrors.KICKED}||${res.message}`)
    }
    // 禁止登录
    if (res.status === 20107) {
      throw new Error(`${ResponseErrors.REJECT}||${res.message}`)
    }
    // 主动再次提交之后重复提交提示
    if (res.status === 10039) {
      throw new Error(`${ResponseErrors.SAME_REQ}`)
    }
    // 登录与自动续期
    if (res.authorization && res.authorization.token) {
      Store.localStorage.set('auth', res.authorization.token)
      Store.localStorage.remove('sessionId')
    }
    return res
  }

  // 旧版经典接口登录超时等检查
  private classicCheck = (res: any) => {
    // 只检查旧版接口
    if (!_.includes(this.key, 'classic/')) {
      return res
    }
    // 登录超时
    if (res.sMsg && res.sMsg.indexOf('重新登录') > -1) {
      throw new Error(`${ResponseErrors.NO_AUTH}||${res.sMsg}`)
    }
    if (res.status === 900001) {
      throw new Error(`${ResponseErrors.ALI_CAPTCHA}`)
    }
    if (res.status === 20217) {
      throw new Error(ResponseErrors.LOGINP_PASS_CHANGED)
    }
    // 登录超时 （70001：设备号拉黑）
    if (
      _.includes(
        [20101, 20102, 20103, 20111, 30018, 30003, 30713, 70001],
        res.status,
      )
    ) {
      throw new Error(`${ResponseErrors.NO_AUTH}||${res.sMsg}`)
    }
    // 禁止登录
    if (res.status === 20107) {
      throw new Error(`${ResponseErrors.REJECT}||${res.sMsg}`)
    }
    // 超时 - 10003据后端说部分接口有（可能有坑）
    if (res.status === 10003) {
      throw new Error(`${ResponseErrors.TOO_MANY_REQ}`)
    }
    // 被踢下线
    if (res.status === 20106) {
      throw new Error(`${ResponseErrors.REJECT}||${res.sMsg}`)
    }
    // 登录与自动续期
    if (res.authorization && res.authorization.token) {
      Store.localStorage.set('auth', res.authorization.token)
      Store.localStorage.remove('sessionId')
    }
    // 接口数据整理
    const prevPick: any = [],
      nextPick: any = []
    _.each(
      this.picks.filter((it: string) => it !== '*'),
      (item: any) => {
        prevPick.push(item.split('->')[0])
        nextPick.push(item.split('->')[1] || item.split('->')[0])
      },
    )
    const picks: any = {}
    _.each(prevPick, (item: string, index: number) => {
      picks[nextPick[index]] = _.isNil(res[item])
        ? picks[nextPick[index]]
        : res[item]
      delete res[item]
    })
    if (res.pageinfo || res.pages) {
      const pageInfo = res.pageinfo || res.pages
      picks.recordsCount = parseInt(_.split(pageInfo, ' ')[1])
    }
    // * 号追加
    if (_.includes(this.picks, '*')) {
      _.each(res, (item: any, key: string) => {
        if (picks[key]) {
          picks[`_api_${key}`] = item
        } else {
          picks[key] = item
        }
      })
    }
    return picks
  }
}

export default HTTP

// 请求错误枚举
export enum ResponseErrors {
  NO_AUTH = '登录超时，请重新登录',
  KICKED = '账号已在其他地方登录，请重新登录',
  REJECT = '登录受限',
  LOGINP_PASS_CHANGED = '登录密码已被修改，请重新登录',
  SAME_REQ = '重复提交',
  TOO_MANY_REQ = '请求太频繁',
  ALI_CAPTCHA = '阿里人机验证',
}
