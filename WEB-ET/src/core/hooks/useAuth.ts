/*
 * @Date: 2024-10-02 17:36:02
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useAuth.ts
 * @Description:
 */
import useGlobal from '@hooks/useGlobal'
import useEventEmitter from './useEventEmitter'
import dayjs from 'dayjs'
export default () => {
  const { useSelector } = useGlobal()
  const { emit: emitForceSuccess } = useEventEmitter('openForce')
  const userInfo = useSelector((state) => state.user.info)
  const inputDate = dayjs(userInfo?.registertime) //传入日期
  const currentDate = dayjs() // 当前日期
  const dayDifference = inputDate.startOf('day').diff(currentDate, 'day')
  const checkKYCVerifeid =
    (fn: Function) =>
    (...args: Array<any>) => {
      // 这里写判断是否强制认证的逻辑，如条件为 false 则弹窗提示
      if (Math.abs(dayDifference) > 3 && userInfo?.kyc_status !== 1) {
        // 已经实名认证
        emitForceSuccess()
        return
      }
      fn(...args)
    }

  return {
    checkKYCVerifeid,
  }
}
