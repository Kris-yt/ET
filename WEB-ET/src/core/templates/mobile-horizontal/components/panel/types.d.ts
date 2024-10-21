/*
 * @Date: 2024-07-30 09:42:28
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/panel/types.d.ts
 * @Description:
 */

import type { IProps as OverlayProps } from '@base-ui/components/overlay/types'

export interface IProps extends OverlayProps {
  // 显示在面板上标题
  title?: string
  // 面板类型，页面或者弹窗
  type?: 'page' | 'modal'
  // 面板模式，面板或者空白
  mode?: 'board' | 'empty'
  // 是否显示返回按钮
  isShowBack?: boolean
  // 默认返回路径，如果没有传入则默认返回上一页
  defalutBackPath?: string
  // 关闭事件, 如果传入则显示关闭按钮
  onClose?: () => void
  // 返回事件
  onBack?: () => void
  // 左下角节点
  pageLeftNode?: React.ReactNode
  // 右下角节点
  pageRightNode?: React.ReactNode
}

export interface IPanelMenusProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface IPanelMiniBoardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
