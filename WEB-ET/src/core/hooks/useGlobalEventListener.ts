/*
 * @Date: 2024-08-21 10:57:40
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useGlobalEventListener.ts
 * @Description:
 */
import useEventMitt from './useEventEmitter'
import useGlobal from './useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()

  /**
   * @description: 登出
   */
  useEventMitt('logout', ({ popup }) => {
    if (popup) {
      dispatch(
        ACTIONS.BASE.openConfirm({
          title: $t('提示'),
          content: $t('您确定要退出吗?'),
          actions: [
            {
              text: $t('是'),
              cb: () => {
                dispatch(ACTIONS.USER.logout())
              },
            },
            {
              text: $t('否'),
              type: 'cancel',
            },
          ],
        }),
      )
      return
    }
    dispatch(ACTIONS.USER.logout())
  })
}
