/*
 * @Date: 2024-08-03 10:10:46
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useGlobal.ts
 * @Description:
 */
import ACTIONS from '@actions/index'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch,
} from 'react-redux'
import type TStore from '@/core/reducers/types'

export default () => {
  const dispatch = useDispatch()
  const useSelector: TypedUseSelectorHook<TStore> = useReduxSelector

  return {
    dispatch,
    useSelector,
    ACTIONS,
  }
}
