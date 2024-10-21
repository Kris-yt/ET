/*
 * @Date: 2024-07-26 13:19:35
 * @FilePath: /AS-WEB-3.5/src/core/templates/base-ui/components/background/types.d.ts
 * @Description:
 */
export interface IProps extends React.HTMLAttributes<HTMLElement> {
  // html BLOCK标签名
  tag?: keyof HTMLElementTagNameMap
  // img 图片的src属性对应的值
  src?: string
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  //是否禁用
  disabled?: boolean
}
