import { Middleware } from 'redux'

const relationsMiddleware: Middleware = (store) => (next) => (action: any) => {
  // 检查 action.relations 是否存在并且是函数
  if (!action.relations || typeof action.relations !== 'function') {
    return next(action)
  }

  try {
    // 执行 relations 函数，传入 dispatch 和 getState
    action.relations({ dispatch: store.dispatch, getState: store.getState })
  } catch (error) {
    console.error('Error in relations middleware:', error)
  }

  // 继续下一步 action
  return next(action)
}

export default relationsMiddleware
