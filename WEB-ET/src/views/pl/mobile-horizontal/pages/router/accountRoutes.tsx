/*
 * @Date: 2024-08-21 16:56:02
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/accountRoutes.tsx
 * @Description:
 */
import Account from '@shadow/pages/account/index'
import InfoBind from '@shadow/pages/account/info-bind/index'
import Gcash from '@shadow/pages/account/gcash/index'
import Maya from '@shadow/pages/account/maya/index'
import GrabPay from '@shadow/pages/account/grabpay/index'

export const accountRoutes = [
  {
    path: 'account/info-bind',
    element: <InfoBind />,
    needLogin: true,
  },
  {
    path: 'account',
    element: <Account />,
    needLogin: true,
    children: [
      { path: 'gcash', element: <Gcash /> },
      { path: 'maya', element: <Maya /> },
      { path: 'grabpay', element: <GrabPay /> },
    ],
  },
]
