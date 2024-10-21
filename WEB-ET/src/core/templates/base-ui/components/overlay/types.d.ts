/*
 * @Date: 2024-07-30 09:59:42
 * @FilePath: /AS-WEB-3.5/src/core/templates/base-ui/components/overlay/types.d.ts
 * @Description:
 */

import React from 'react'

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  display: boolean
  zIndex?: number
  onClose?: () => void
  onChange?: () => void
  onChangePassword?: () => void
}
