/*
 * @Date: 2024-07-27 01:49:08
 * @FilePath: /AS-WEB-3.5/src/core/utlis/logger.ts
 * @Description:
 */

// 判断环境 HOF
const runIfDev = (fn: Function) => {
  if (!__DEV__) {
    return () => {}
  }
  return (...args: any[]) => {
    const error = new Error()
    const stack = error.stack?.split('\n')
    let callerInfo = stack && stack[2] ? stack[2].trim() : 'unknown location'
    callerInfo = callerInfo.replace('at ', '')
    callerInfo = callerInfo.replace('(', '')
    callerInfo = callerInfo.replace(')', '')
    callerInfo = callerInfo.split('webpack-internal://')[1] || callerInfo
    let functionName = ''
    if (callerInfo.includes(' ')) {
      functionName = callerInfo.split(' ')[0]
      callerInfo = callerInfo.split(' ')[1]
    }
    const style = 'color: lightBlue; font-weight: bold'
    fn(
      `%c📚 ${callerInfo} ${functionName ? ' Trace Function: ' + functionName : ''}\n`,
      style,
      ...args,
    )
  }
}

export default {
  /**
   * @description: 打印信息
   */
  info: runIfDev(console.log),

  /**
   * @description: 打印错误
   */
  error: runIfDev(console.error),

  /**
   * @description: 打印警告
   */
  warn: runIfDev(console.warn),

  /**
   * @description: 打印调试信息
   */
  trace: runIfDev(console.trace),
}
