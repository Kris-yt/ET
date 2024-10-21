/*
 * @Date: 2024-08-21 16:54:48
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/router/homeRoutes.tsx
 * @Description:
 */
import Home from '@shadow/pages/home/index'
import Announcement from '@shadow/pages/announcement/index'
import Login from '@shadow/pages/login/index'
import Register from '@shadow/pages/register/index'
import Promotion from '@shadow/pages/promotion/index'
import PromotionDetail from '@shadow/pages/promotion/promotion-detail/index'
import JointPlan from '@shadow/pages/joint-plan'
import ForgotPassword from '@shadow/pages/forgot-password/index'
import MessageCenter from '@shadow/pages/message-center/index'

export const homeRoutes = [
  {
    path: 'home',
    element: <Home />,
    children: [
      { path: 'announcement', element: <Announcement /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      {
        path: 'promotion',
        element: <Promotion />,
        children: [{ path: 'detail/:id', element: <PromotionDetail /> }],
      },
      { path: 'joint-plan', element: <JointPlan /> },
      { path: 'messagecenter', element: <MessageCenter /> },
    ],
  },
]
