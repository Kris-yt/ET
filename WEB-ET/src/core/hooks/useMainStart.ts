/*
 * @Date: 2024-08-03 17:17:14
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useMainStart.ts
 * @Description:
 */
import { useMount } from 'react-use'
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()

  useMount(() => {
    dispatch(ACTIONS.BASE.getSettings())
    if (Store.localStorage.get('auth')) {
      dispatch(ACTIONS.USER.getProfile({}))
    }
  })
}
