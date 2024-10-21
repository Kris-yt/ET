/*
 * @Date: 2024-07-26 13:57:13
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/button/index.tsx
 * @Description:
 */

import Background from '@base-ui/components/background'
import configs from './configs'
import { EButtonSize, EButtonType } from './types.d'
import type { IProps } from './types.d'
import style from './style.module.scss'

export default ({
  size = EButtonSize.md,
  type = EButtonType.default,
  children,
  className,
  disabled,
  ...rest
}: IProps) => {
  const disabledClass = disabled ? style['disabled'] : ''

  const classNames = [
    style['button-container'],
    style[size],
    disabledClass,
    className,
  ]

  return (
    <Background
      tag="button"
      className={classNames.join(' ')}
      src={configs.buttonBackground[size]?.[type] ?? ''}
      style={{
        color: type === 'cancel' ? '#995A0E' : '#3E881B',
        backgroundSize: 'cover',
      }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Background>
  )
}
