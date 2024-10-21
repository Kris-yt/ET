/*
 * @Date: 2024-07-31 18:40:49
 * @FilePath: /AS-WEB-3.5/src/core/services/network/enum.ts
 * @Description:
 */
// 请求错误枚举
export enum EResponseErrors {
  NO_AUTH = '登录超时，请重新登录',
  KICKED = '账号已在其他地方登录，请重新登录',
  REJECT = '登录受限',
  SAME_REQ = '重复提交',
  TOO_MANY_REQ = '请求太频繁',
}

// 请求方法枚举
export enum ERequestMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}
