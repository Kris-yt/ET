/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/instruction/index.tsx
 * @Description:
 */
import Background from '@base-ui/components/background'
import Button from '@shadow/components/button'
import style from './style.module.scss'

export default ({ setSubmitStep }) => {
  return (
    <div>
      <div className={style['item-container']}>
        <Background
          className={style['item-bg']}
          tag={'div'}
          src={require('./i/step1.png?format=webp')}
        >
          {/* <div className={style['item-title']}>Step1</div>
          <div className={style['item-content']}>Choose a ID type</div> */}
        </Background>
        <Background
          className={style['item-bg']}
          tag={'div'}
          src={require('./i/step2.png?format=webp')}
        >
          {/* <div className={style['item-title']}>Step2</div>
          <div className={style['item-content']}>
            Take photo or <br></br>upload of ID
          </div> */}
        </Background>
        <Background
          className={style['item-bg']}
          tag={'div'}
          src={require('./i/step3.png?format=webp')}
        >
          {/* <div className={style['item-title']}>Step3</div>
          <div className={style['item-content']}>Information confirm</div> */}
        </Background>
        <Background
          className={style['item-bg']}
          tag={'div'}
          src={require('./i/step4.png?format=webp')}
        ></Background>
      </div>
      <div className={style['item-button']}>
        <Button onClick={() => setSubmitStep(2)}>Go</Button>
      </div>
    </div>
  )
}
