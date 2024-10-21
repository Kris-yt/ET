/*
 * @Date: 2024-07-31 11:26:18
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/select/types.d.ts
 * @Description:
 */
import type { IProps as InputProps } from '@templates/components/input-text/types.d.ts'

export interface IProps extends InputProps {
  options: Object<{
    label: string
    value: string | number
  }>
  onSelected: (value: string | number) => void
  //特殊样式容器，可改变宽高，颜色....
  specialStyle?: string
}
