/*
 * @Date: 2024-07-23 17:29:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/main-framework/index.tsx
 * @Description:
 */
import useLayout from '@templates/hooks/useLayout'
import useMainStart from '@/core/hooks/useMainStart'
import useStateKeeper from '@/core/hooks/useStateKeeper'
import useGlobalEventListener from '@/core/hooks/useGlobalEventListener'
import Modal from '@shadow/components/alert'
import Toast from '@shadow/components/toast'
import LoginModal from '@shadow/components/business-modals/login'
// import RegisterModal from '@shadow/components/business-modals/register'
import ForgotPassword from '@shadow/components/business-modals/fotgot-password'
import KycSuggest from '@shadow/pages/kyc/suggest-kyc'
import KycForce from '@shadow/pages/kyc/force-kyc'
import GlobalLoader from '@shadow/components/loading/GlobalLoader'
import VerticalPlaceholder from '@shadow/components/orientation-alert/index'
import type { IProps } from './types.d'
import style from './style.module.scss'
import { useEffect, useState } from 'react'

export default ({ children }: IProps) => {
  useMainStart()
  useGlobalEventListener()
  useStateKeeper()
  useLayout()
  const hash = window.location.hash
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight,
  )
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.location.hash])

  return (
    <div className={style['framework-container']}>
      <div className={style['page-container']}>
        <main className="horizontal" id="horizontal-container">
          {children}
        </main>
        {!isLandscape && hash.includes('iframe') ? (
          <section className="vertical" id="vertical-container">
            {children}
          </section>
        ) : (
          <section className="vertical" id="vertical-container">
            {(hash.includes('download') || hash.includes('iframe')) && children}
            {!hash.includes('download') && !hash.includes('iframe') && (
              <VerticalPlaceholder orientation={'vertical'} />
            )}
          </section>
        )}
      </div>
      <Modal />
      <Toast />
      <GlobalLoader />
      <LoginModal />
      {/* <RegisterModal /> */}
      <ForgotPassword />
      <KycSuggest />
      <KycForce />
    </div>
  )
}
