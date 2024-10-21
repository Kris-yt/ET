/*
 * @Date: 2024-08-21 16:58:40
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/PrivateRoute.tsx
 * @Description:
 */
import React from 'react'
import useGlobal from '@/core/hooks/useGlobal'
import { Navigate } from 'react-router-dom'

interface IProps {
  element: React.ReactNode
}
const ProtectedRoute = ({ element }: IProps) => {
  const { useSelector } = useGlobal()

  const userInfo = useSelector((state) => state.user.info)

  if (!userInfo?.userid) {
    return <Navigate to="/home/login" />
  }

  return element
}

export default ProtectedRoute
