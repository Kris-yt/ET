/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-25 10:43:38
 * @LastEditors: Please set LastEditors
 * @FilePath: /AS-WEB-3.5/src/core/middleware/request.ts
 * @Description: 请求中间件
 */
import _ from 'lodash'
import HTTP from '@services/network'
import ACTIONS from '@actions/index'

export default (store: any) => (next: any) => (action: any) => {
  if (!action.payload || !action.payload.key) {
    return next(action)
  }

  // 请求实例
  const requestIns = new HTTP(
    {
      ...action.payload,
      dataFix: action.dataFix,
      fieldFix: action.fieldFix,
      cb: action.cb,
      picks: action.picks,
    },
    store.dispatch,
  )

  // 先取缓存（与V2版本不同的是，V3版本取完缓存之后可选择是否仍然请求接口，然后缓存最新的接口数据）
  if (
    requestIns.isCache() &&
    Store.localStorage.getRaw(requestIns.cacheKey()) &&
    !action.payload.mock
  ) {
    const resCache = Store.localStorage.getRaw(requestIns.cacheKey())
    // 缓存非绑定用户，或者绑定用户与当前用户一致
    if (
      !requestIns.getCache()?.isUserBind ||
      (_.get(resCache, '__USERID__') == store.getState().user.info.userid &&
        !requestIns.getCache()?.cacheClear)
    ) {
      // reducers
      next({
        ...action,
        res: resCache.data,
      })
      // callbacks
      typeof action.cb === 'function' &&
        action.cb(Store.localStorage.getRaw(requestIns.cacheKey()), action)
      // 是否追加下一次请求
      if (!requestIns.getCache()?.forward) {
        return
      }
    }
  }

  // 发送请求
  requestIns.sendHttp({
    mock: action.payload.mock,
    callback: (res: any) => {
      let data = {}
      // 新版接口 取返回值中的data
      if (_.includes(action.payload.key, 'rest/')) {
        data = res.data
      }
      // 旧版接口 从PICKS里面获取对应的数据
      if (_.includes(action.payload.key, 'classic/')) {
        data = res
      }
      // 新版接口 错误处理
      if (
        _.includes(action.payload.key, 'rest/') &&
        res.status != 10000 &&
        !action.passError
      ) {
        const errors = res.errors
          ? _.chain(res.errors).values().join('\n').value()
          : res.message
        store.dispatch(ACTIONS.BASE.openToast({ text: errors, type: 'error' }))
        return
      }
      // 缓存（仅支持在新版接口正常情况下缓存数据）
      if (requestIns.isCache() && res.status == 10000 && !action.payload.mock) {
        const extendUserBind = requestIns.getCache()?.isUserBind
          ? { __USERID__: store.getState().user.info.userid }
          : {}
        Store.localStorage.setRaw(
          requestIns.cacheKey(),
          { ...res, ...extendUserBind },
          (requestIns.getCache()?.expires ?? 0) * 60,
        )
      }
      // next
      next({
        ...action,
        res: data,
      })
      // ACTION层回调
      if (action.continue && typeof action.continue === 'function') {
        action.continue({ res: res, dispatch: store.dispatch })
      }
      // 视图层回调
      if (action.cb && typeof action.cb === 'function') {
        action.cb(res, action, store.dispatch)
      }
    },
  })
}
