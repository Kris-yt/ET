/*
 * @Date: 2024-07-30 15:19:56
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/panel/button/index.tsx
 * @Description:
 */
import type { IProps } from './types'
import style from './style.module.scss'

export default ({
  state = 'unchecked',
  size = 'md',
  className = '',
  children,
  ...rest
}: IProps) => {
  return (
    <div
      className={`${style['panel-button-container']} ${style[size]} ${style[state]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
