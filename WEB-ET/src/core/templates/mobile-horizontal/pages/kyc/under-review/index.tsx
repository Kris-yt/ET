/*
 * @Date: 2024-07-30 01:05:05
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/home/navigation/index.tsx
 * @Description:
 */
import Background from '@base-ui/components/background'
import style from './style.module.scss'

export default () => {
  return (
    <div className={style['item-container']}>
      <Background
        className={style['item-icon']}
        tag={'div'}
        src={require('./i/icon.png?format=webp')}
      ></Background>
      <div className={style['item-content']}>
        Thank you for verifying with us, please kindly wait
        <br></br>
        up to process your request!
      </div>
    </div>
  )
}
