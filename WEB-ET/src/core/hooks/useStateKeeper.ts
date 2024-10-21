/*
 * @Date: 2024-08-07 10:12:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useStateKeeper.ts
 * @Description:
 */
import useGlobal from './useGlobal'
import { useEffect } from 'react'

export default () => {
  const { useSelector } = useGlobal()
  const userInfo = useSelector((state) => state.user.info)

  // 实时保存用户状态
  useEffect(() => {
    if (!userInfo?.userid) {
      Store.localStorage.remove('userProfile')
      return
    }
    Store.localStorage.set('userProfile', userInfo, 3600 * 24 * 7)
  }, [JSON.stringify(userInfo)])
}
