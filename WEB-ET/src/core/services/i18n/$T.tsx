/*
 * @Date: 2024-08-02 19:03:59
 * @FilePath: /AS-WEB-3.5/src/core/services/i18n/$T.tsx
 * @Description:
 */
import $t from './index'

interface IProps {
  children: React.ReactNode
  kw?: string
  params?: {
    [key: string]: any
  }
}
export default ({ children, params = {}, kw = '' }: IProps) =>
  $t(<>{children}</>, params, { kw })
