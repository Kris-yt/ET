/*
 * @Date: 2024-08-21 19:10:27
 * @FilePath: /AS-WEB-3.5/src/core/hooks/usePreviousRoute.ts
 * @Description:
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const location = useLocation()
  const prev = useRef('')

  useEffect(() => {
    dispatch(ACTIONS.BASE.recordRoute(prev.current, location.pathname))
    prev.current = location.pathname
  }, [location])
}
