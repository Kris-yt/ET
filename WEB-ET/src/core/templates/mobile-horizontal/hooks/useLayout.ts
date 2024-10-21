/*
 * @Date: 2024-07-24 17:32:42
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/hooks/useLayout.ts
 * @Description:
 */
import React from 'react'
import remSet from '@utlis/remSet'

export default () => {
  React.useEffect(() => {
    remSet()
  }, [])
}
