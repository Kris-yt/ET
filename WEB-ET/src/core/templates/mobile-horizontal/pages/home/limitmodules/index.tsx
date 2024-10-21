/*
 * @Date: 2024-09-3 11:10:35
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/limitmodules/games/index.tsx
 * @Description:
 */
import { useEffect, useState } from 'react'
import Overlay from '@base-ui/components/overlay'
import Background from '@base-ui/components/background'
import style from './style.module.scss'
import Button from '@shadow/components/button'
import Agreement from '@templates/components/business-modals/agreement'
import Disclaimer from '@templates/components/business-modals/disclaimer'
export default () => {
  const [dismodal, setdisModal] = useState(false)
  const [status, setStatus] = useState(false)
  const [agestatus, setAgeStatus] = useState(false)
  const [governmentstatus, setGovermentStatus] = useState(false)
  const [gelstatus, setGelStatus] = useState(false)
  const [allstatus, setAllStatus] = useState(false)
  const [policestatus, setPoliceStatus] = useState(false)
  const [ndrpstatus, setNdrpStatus] = useState(false)
  const [creditsstatus, setCreditsStatus] = useState(false)
  const [modal, setModal] = useState<boolean>(false)
  const [disclmodal, setdisclmodal] = useState(false)
  useEffect(() => {
    const orientation = window.innerWidth > window.innerHeight ? false : true
    if (orientation) {
      setdisModal(true)
    }
  }, [])
  const onHandleModel = () => {
    if (!status) {
      setModal(true)
    } else {
      setStatus(false)
    }
  }
  const onHandleAge = () => {
    if (!agestatus) {
      setAgeStatus(true)
    } else {
      setAgeStatus(false)
    }
  }
  const onHandleGoveenment = () => {
    if (!governmentstatus) {
      setGovermentStatus(true)
    } else {
      setGovermentStatus(false)
    }
  }
  const onHandlePolice = () => {
    if (!policestatus) {
      setPoliceStatus(true)
    } else {
      setPoliceStatus(false)
    }
  }
  const onHandleNdrp = () => {
    if (!ndrpstatus) {
      setNdrpStatus(true)
    } else {
      setNdrpStatus(false)
    }
  }
  const onHandleGel = () => {
    if (!gelstatus) {
      setGelStatus(true)
    } else {
      setGelStatus(false)
    }
  }
  const onHandleCredits = () => {
    if (!creditsstatus) {
      setCreditsStatus(true)
    } else {
      setCreditsStatus(false)
    }
  }
  const onHanleAll = () => {
    if (!allstatus) {
      setAgeStatus(true)
      setGovermentStatus(true)
      setGelStatus(true)
      setAllStatus(true)
      setPoliceStatus(true)
      setNdrpStatus(true)
      setCreditsStatus(true)
    } else {
      setAgeStatus(false)
      setGovermentStatus(false)
      setGelStatus(false)
      setAllStatus(false)
      setPoliceStatus(false)
      setNdrpStatus(false)
      setCreditsStatus(false)
    }
  }
  return (
    <Overlay
      className={style['overlay-container']}
      display={!disclmodal}
      zIndex={9}
    >
      <Background
        className={style['panel-container']}
        src={require('./i/agreement-bg.png?format=webp')}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div
          className={style['close']}
          onTouchEnd={() => (window.location.href = 'https://www.google.com')}
        >
          <img src={require('./i/close.png?format=webp')} />
        </div>
        <div className={style['content-container']}>
          <div className={style['careful']}>
            Please read our&nbsp;&nbsp;
            <span
              className={style['withUnderline']}
              onClick={() => setdisModal(true)}
            >
              Responsible Gaming
            </span>
            &nbsp;&nbsp;guidelines carefully:
          </div>
          <div className={style['checkbox-container']}>
            <div className={style['age']}>
              <input
                type="checkbox"
                id="age"
                checked={agestatus}
                onChange={onHandleAge}
              />
              <label htmlFor="age">I am over 21 years of age.</label>
            </div>
            <div className={style['government']}>
              <input
                type="checkbox"
                id="government"
                checked={governmentstatus}
                onChange={onHandleGoveenment}
              />
              <label htmlFor="government">
                I am not a Government Official or employee connected directly
                with the operation of the Government or any of its agencies.
              </label>
            </div>
            <div className={style['police']}>
              <input
                type="checkbox"
                id="police"
                checked={policestatus}
                onChange={onHandlePolice}
              />
              <label htmlFor="police">
                I am not a Member of the Armed Forces of the Philippines,
                including the Army, Navy, Air Force, or the Philippine National
                Police.
              </label>
            </div>
            <div className={style['NDRP']}>
              <input
                type="checkbox"
                id="ndrp"
                checked={ndrpstatus}
                onChange={onHandleNdrp}
              />
              <label htmlFor="ndrp">
                I am not a Persons included in the PAGCOR's National Database of
                Restricted Persons (NDRP)
              </label>
            </div>
            <div className={style['GEL']}>
              <input
                type="checkbox"
                id="gel"
                checked={gelstatus}
                onChange={onHandleGel}
              />
              <label htmlFor="gel">
                I am not a Gaming Employment License (GEL) holder.
              </label>
            </div>
            <div className={style['CREDITS']}>
              <input
                type="checkbox"
                id="credits"
                checked={creditsstatus}
                onChange={onHandleCredits}
              />
              <label htmlFor="credits">
                Funds or credits in the account of player who is found
                ineligible to play shall mean forfeiture of said funds/credits
                in favor of the Government.
              </label>
            </div>
            <div className={style['agreement']}>
              <input
                type="checkbox"
                id="agreeResponsible"
                checked={status}
                onChange={onHandleModel}
              />
              <label htmlFor="agreeResponsible">
                I have read and agree to{' '}
                <span
                  onClick={() => setModal(true)}
                  className={style['withUnderline']}
                >
                  Legend Link’s&nbsp;Terms of Use&nbsp;and&nbsp;Privacy Policy.
                </span>
              </label>
            </div>
            <div className={style['agree-all-mentioned']}>
              <input
                type="checkbox"
                id="agreeAllMentioned"
                checked={allstatus}
                onChange={onHanleAll}
              />
              <label htmlFor="agreeAllMentioned">
                I agree to all the above mentioned.
              </label>
            </div>
          </div>
          <div className={style['foot-container']}>
            <div className={style['des']}>
              <img src={require('./i/des.png?format=webp')} />
            </div>
            <Button
              size="sd"
              type="cancel"
              onClick={() => (window.location.href = 'https://www.google.com')}
            >
              {'EXIT'}
            </Button>
            <Button
              size="sd"
              disabled={
                !(
                  agestatus == true &&
                  governmentstatus == true &&
                  gelstatus == true &&
                  status == true &&
                  allstatus == true
                )
              }
              onClick={() => setdisclmodal(true)}
            >
              {$t('确定')}
            </Button>
          </div>
        </div>
      </Background>
      {modal && (
        <Agreement
          onClose={() => setModal(false)}
          onStutas={() => setStatus(true)}
        />
      )}
      {dismodal && <Disclaimer onClose={() => setdisModal(false)} />}
    </Overlay>
  )
}
