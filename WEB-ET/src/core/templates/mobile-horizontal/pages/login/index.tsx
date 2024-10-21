/*
 * @Date: 2024-08-07 10:47:46
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/login/index.tsx
 * @Description:
 */
import { useMount } from 'react-use'
import { useNavigate } from 'react-router-dom'
import useEventEmitter from '@hooks/useEventEmitter'

export default () => {
  const navigate = useNavigate()
  const { emit } = useEventEmitter('openLogin')

  useEventEmitter('closeLogin', () => {
    navigate('/home')
  })

  useMount(() => {
    requestAnimationFrame(emit as () => void)
  })

  return <></>
}
