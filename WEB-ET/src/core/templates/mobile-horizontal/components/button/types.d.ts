/*
 * @Date: 2024-07-26 13:57:27
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/button/types.d.ts
 * @Description:
 */

export enum EButtonSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xd = 'xd',
  sd = 'sd',
}

export enum EButtonType {
  default = 'default',
  cancel = 'cancel',
}

export type TButtonSize = keyof typeof EButtonSize
export type TButtonType = keyof typeof EButtonType

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: TButtonSize
  type?: TButtonType
  disabled?: boolean
  children?: React.ReactNode
}
