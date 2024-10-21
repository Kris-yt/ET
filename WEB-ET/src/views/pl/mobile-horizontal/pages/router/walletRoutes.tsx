/*
 * @Date: 2024-08-21 16:55:50
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/walletRoutes.tsx
 * @Description:
 */
import Wallet from '@shadow/pages/wallet/index'
import Deposit from '@shadow/pages/deposit/index'
import Withdraw from '@shadow/pages/withdraw/index'

export const walletRoutes = [
  {
    path: 'wallet',
    element: <Wallet />,
    needLogin: true,
    children: [
      { path: 'deposit', element: <Deposit /> },
      { path: 'withdraw', element: <Withdraw /> },
    ],
  },
]
