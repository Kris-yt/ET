/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/failed-review/index.tsx
 * @Description:
 */
import Background from '@base-ui/components/background'
import Button from '@shadow/components/button'
import style from './style.module.scss'

interface IProps {
  setSubmitStep: (step: number) => void
  reason: string
}
export default ({ setSubmitStep, reason }: IProps) => {
  return (
    <div className={style['item-container']}>
      <Background
        className={style['item-icon']}
        tag={'div'}
        src={require('./i/icon.png?format=webp')}
      ></Background>
      <div className={style['item-box']}>
        <div className={style['item-content']}>
          Your KYC verification request was rejected, please resubmit
        </div>
        <div className={style['item-divider']}></div>
        <div className={style['item-tips']}>
          Reason:
          <span>{reason}</span>
        </div>
      </div>
      <Button onClick={() => setSubmitStep(1)}>Resubmit</Button>
    </div>
  )
}
