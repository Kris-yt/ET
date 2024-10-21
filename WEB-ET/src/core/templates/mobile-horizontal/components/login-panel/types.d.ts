/*
 * @Date: 2024-07-31 01:12:48
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/mini-panel/types.d.ts
 * @Description:
 */
import type { IProps as OverlayProps } from '@base-ui/components/overlay/types'

export interface IProps extends OverlayProps {
  title: Object<{
    register: string
    login: string
  }>
  size?: 's' | 'm' | 'l'
  tabs: string
  onChangeTabs: (key: 'register' | 'login') => void
}
