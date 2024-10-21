import type { IProps } from './types'
import style from './style.module.scss'

export default ({ ...props }: IProps) => {
  const { tag: Tag = 'div', className, ...rest } = props

  return (
    <Tag className={`${style['no-data-container']} ${className}`} {...rest}>
      <img src={require('./i/no-data.png?format=webp')} alt="" />
    </Tag>
  )
}
