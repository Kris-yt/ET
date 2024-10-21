/*
 * @Date: 2024-07-26 13:19:07
 * @FilePath: /AS-WEB-3.5/src/core/templates/base-ui/components/background/index.tsx
 * @Description:
 */
import type { IProps } from './types'
import styles from './style.module.scss'

export default ({ ...props }: IProps) => {
  const {
    tag: Tag = 'div',
    src,
    style,
    className,
    disabled,
    children,
    ...rest
  } = props

  return (
    <Tag
      className={`${styles['background-container']} ${className}`}
      style={{ ...style, backgroundImage: `url(${src})` }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Tag>
  )
}
