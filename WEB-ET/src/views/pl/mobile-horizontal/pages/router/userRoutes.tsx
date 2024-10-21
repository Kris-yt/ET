/*
 * @Date: 2024-08-21 15:10:37
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/userRoutes.tsx
 * @Description:
 */
import UserCenter from '@shadow/pages/user-center/index'
import SecuritySettings from '@shadow/pages/user-center/security-settings/index'
import SecurityCenter from '@shadow/pages/user-center/security-settings'
import Transfer from '@shadow/pages/user-center/transfer'
import More from '@shadow/pages/user-center/more'
import BonusCenter from '@shadow/pages/user-center/bonus-center'
export const userRoutes = [
  {
    path: 'user',
    element: <UserCenter />,
    needLogin: true,
    children: [
      { path: 'security-settings', element: <SecuritySettings /> },
      { path: 'security', element: <SecurityCenter /> },
      { path: 'transfer', element: <Transfer /> },
      { path: 'more', element: <More /> },
      { path: 'bonus-center', element: <BonusCenter /> },
    ],
  },
]
