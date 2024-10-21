/*
 * @Date: 2024-08-05 10:06:19
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/loading/GlobalLoader.tsx
 * @Description:
 */
import Overlay from '@base-ui/components/overlay'
import Loading from '@shadow/components/loading'
import useGlobal from '@/core/hooks/useGlobal'

export default () => {
  const { useSelector } = useGlobal()
  const loading = useSelector((state) => state.base.loading)

  return (
    <Overlay display={loading.display} zIndex={100}>
      <Loading />
    </Overlay>
  )
}
