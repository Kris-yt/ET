/*
 * @Date: 2024-08-07 10:47:46
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/403/index.tsx
 * @Description:
 */
import style from './style.module.scss'
import Button from '@shadow/components/button'
import useGlobal from '@/core/hooks/useGlobal'

export default () => {
  const { useSelector } = useGlobal()

  const customer_service_url = useSelector(
    (state) => state.base.settings?.customer_service_url,
  )

  const handleRefresh = () => {
    // location.reload()
    location.href = '#'
  }

  return (
    <div className={style['ip-403-container']}>
      <div className={style['ip-403-content']}>
        <div className={style['ip-403-btns']}>
          <Button onClick={() => window.open(customer_service_url)}>
            Chat
          </Button>
          <Button type="cancel" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
