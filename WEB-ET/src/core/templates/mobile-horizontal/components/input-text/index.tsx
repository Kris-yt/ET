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
    type = 'text',
    onClick = () => {},
    onChange = () => {},
    ...rest
  } = props

  return (
    <div
      className={`${style['input-text-container']} ${style[specialStyle]}`}
      onClick={onClick}
    >
      <div className={`${style['input-area-container']} ${style[shape]}`}>
        {leftNode}
        {type === 'text' && (
          <input onChange={(e) => onChange(e.target.value)} {...rest} />
        )}
        {type === 'tel' && (
          <input
            onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
            {...rest}
          />
        )}
        {type === 'password' && (
          <input
            type="password"
            onChange={(e) => onChange(e.target.value)}
            {...rest}
          />
        )}
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
