import { useMount } from 'react-use'
import { useNavigate } from 'react-router-dom'
import useEventEmitter from '@hooks/useEventEmitter'
export default () => {
  const navigate = useNavigate()
  const { emit } = useEventEmitter('openForgetPassword')
  useEventEmitter('closeForgetPassword', () => {
    navigate('/home')
  })

  useMount(() => {
    requestAnimationFrame(emit as () => void)
  })

  return <></>
}
