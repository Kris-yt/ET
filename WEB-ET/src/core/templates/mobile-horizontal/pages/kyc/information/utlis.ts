/*
 * @Date: 2024-08-23 15:19:20
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/kyc/information/utlis.ts
 * @Description:
 */
import dayjs from 'dayjs'

import { workOptions, incomeSourceOptions, genderOptions } from './const'
import { nationalityOptions } from './national'
import { TFieldProps } from './types'

/**
 *
 * @param type 字段组件属性
 * @param value 值
 */
export const getDisplay = (type: TFieldProps['field'], value: string) => {
  if (!value) {
    return 'Set'
  }
  switch (type) {
    case 'nationality':
      return (
        nationalityOptions.find((item) => item.value === value)?.label || 'Set'
      )
    case 'work':
      return workOptions.find((item) => item.value === value)?.label || 'Set'
    case 'income_source':
      return (
        incomeSourceOptions.find((item) => item.value === value)?.label || 'Set'
      )
    case 'gender':
      return genderOptions.find((item) => item.value === value)?.label || 'Set'
    case 'birthday':
      return dayjs(value).format('MM/DD/YYYY')
    case 'full_name':
      return value?.length > 15 ? value.slice(0, 15) + '...' : value
    default:
      return value
  }
}
