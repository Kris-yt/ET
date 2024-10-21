/*
 * @Date: 2024-07-31 09:37:13
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/input-text/index.tsx
 * @Description:
 */
import type { IProps } from './types'
import style from './style.module.scss'

export default (props: IProps) => {
  const {
    shape = 'circle',
    leftNode = <></>,
    rightNode = <></>,
    tips = null,
    specialStyle = '',
    onClick = () => {},
    onChange = () => {},
    ...rest
  } = props

  return (
    <div
      className={`${style['input-text-area-container']} ${style[specialStyle]}`}
      onClick={onClick}
    >
      <div className={`${style['text-area-container']} ${style[shape]}`}>
        {leftNode}
        <textarea
          name="textarea"
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {rightNode}
      </div>
      {tips && typeof tips === 'string' ? (
        <div className={style['tips']}>{tips}</div>
      ) : (
        tips
      )}
    </div>
  )
}
