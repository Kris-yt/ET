/*
 * @Date: 2024-07-30 15:20:16
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/panel/button/types.d.ts
 * @Description:
 */
export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  state?: 'checked' | 'unchecked'
}
