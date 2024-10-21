/*
 * @Date: 2024-08-10 09:30:39
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/no-data/types.d.ts
 * @Description:
 */
export interface IProps extends React.HTMLAttributes<HTMLElement> {
  // html BLOCK标签名
  tag?: keyof HTMLElementTagNameMap
  className?: string
}
