/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/failed-review/index.tsx
 * @Description:
 */
import Button from '@shadow/components/button'
import style from './style.module.scss'
import { useState } from 'react'
import MiniPanel from '../../../components/mini-panel'
import useEventEmitter from '@hooks/useEventEmitter'
export default () => {
  const [displayModal, setDisplayModal] = useState<null | boolean>(null)
  useEventEmitter('openForce', () => {
    setDisplayModal(true)
  })

  useEventEmitter('closeForce', () => {
    setDisplayModal(false)
  })
  const handleclick = () => {
    setDisplayModal(false)
    window.location.href = '/webapp/#/user/security'
  }
  return (
    <>
      <MiniPanel
        title={'kyc'}
        size="m"
        display={!!displayModal}
        onClose={() => setDisplayModal(false)}
      >
        <div className={style['item-container']}>
          <div className={style['item-content']}>
            Due to the Regulatory Framework,we are sorry to inform you that you
            are not able to play games until you pass the KYC.
          </div>
          <Button onClick={() => handleclick()}>GO</Button>
        </div>
      </MiniPanel>
    </>
  )
}
