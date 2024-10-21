/*
 * @Date: 2024-08-12 10:30:56
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/register/index.tsx
 * @Description:
 */
import { useMount } from 'react-use'
import { useNavigate } from 'react-router-dom'
import useEventEmitter from '@hooks/useEventEmitter'

export default () => {
  const navigate = useNavigate()
  const { emit } = useEventEmitter('openRegister')

  useEventEmitter('closeRegister', () => {
    navigate('/home')
  })

  useMount(() => {
    requestAnimationFrame(emit as () => void)
  })

  return <></>
}
