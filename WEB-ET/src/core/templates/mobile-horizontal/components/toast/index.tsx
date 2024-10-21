/*
 * @Date: 2024-08-05 09:39:52
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/toast/index.tsx
 * @Description:
 */
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useGlobal from '@/core/hooks/useGlobal'
import style from './style.module.scss'

export default () => {
  const { useSelector } = useGlobal()
  const toastState = useSelector((state) => state.base.toast)

  useEffect(() => {
    if (!toastState.tirgger) {
      return
    }
    if (toastState.types === 'info') {
      toast(toastState.text)
      return
    }
    if (toastState.types === 'success') {
      toast.success(toastState.text)
      return
    }
    if (toastState.types === 'error') {
      toast.error(toastState.text)
      return
    }
  }, [toastState.tirgger])

  return (
    <Toaster
      toastOptions={{
        className: style['toast-container'],
        position: 'top-center',
        duration: 3000,
      }}
    />
  )
}
