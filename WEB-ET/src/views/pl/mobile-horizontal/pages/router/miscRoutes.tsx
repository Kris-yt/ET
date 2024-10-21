/*
 * @Date: 2024-08-21 16:55:27
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/miscRoutes.tsx
 * @Description:
 */
import Demo from '../demo'
import Ip403 from '@shadow/pages/403/index'
import KYC from '@shadow/pages/kyc/index'
import Download from '@shadow/pages/downloads/index'
export const miscRoutes = [
  { path: 'demo', element: <Demo /> },
  { path: '403', element: <Ip403 /> },
  { path: 'kyc', element: <KYC /> },
  { path: 'download', element: <Download /> },
]
