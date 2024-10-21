/*
 * @Date: 2024-07-31 09:37:19
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/input-text/types.d.ts
 * @Description:
 */
export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any
  // 形态， 方形、圆形
  shape?: 'square' | 'circle' | 'sharp' | 'rectangle'
  // 左边节点
  leftNode?: React.ReactNode
  // 右边节点
  rightNode?: React.ReactNode
  // 下方提示
  tips?: string | React.ReactNode
  // 类型
  type?: 'text' | 'tel' | 'password' | 'username'
  // onchange
  onChange?: (string) => void
  //特殊样式容器，可改变宽高，颜色....
  specialStyle?: string
}
