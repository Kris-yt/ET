/*
 * @Date: 2024-07-24 16:46:54
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/orientation-alert/index.tsx
 * @Description:
 */
import style from './style.module.scss'
import { IProps } from './types'
export default (props: IProps) => {
  return (
    <div className={style['vertical-placeholder-container']}>
      {props.orientation === 'vertical' ? (
        <img src={require('./i/icon-action.png?format=webp')} />
      ) : (
        <img src={require('./i/icon-daction.png?format=webp')} />
      )}
      {props.orientation === 'vertical'
        ? 'Please unlock landscape mode'
        : 'Please unlock portrait mode'}
    </div>
  )
}
