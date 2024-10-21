/*
 * @Date: 2024-08-03 10:01:01
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/alert/index.tsx
 * @Description:
 */
import useGlobal from '@/core/hooks/useGlobal'
import MiniPanel from '@shadow/components/mini-panel'
import Button from '@shadow/components/button'
import style from './style.module.scss'

export default () => {
  const { useSelector, dispatch, ACTIONS } = useGlobal()

  const modal = useSelector((state) => state.base.modal)

  const handelTouchEnd = (action) => {
    typeof action.cb === 'function' && action.cb()
    if (action.keepOpen) {
      return
    }
    dispatch(ACTIONS.BASE.closeModal())
  }

  if (!modal.display) {
    return <></>
  }

  return (
    <MiniPanel
      title={modal.title}
      onClose={() => dispatch(ACTIONS.BASE.closeModal())}
      display
    >
      <div className={style['modal-container']}>
        <div className={style['modal-content']}>{modal.content}</div>
        <div className={style['actions']}>
          {modal?.actions?.map((action, index) => (
            <Button
              key={index}
              type={action.type}
              onClick={() => handelTouchEnd(action)}
            >
              {action.text}
            </Button>
          ))}
        </div>
      </div>
    </MiniPanel>
  )
}
