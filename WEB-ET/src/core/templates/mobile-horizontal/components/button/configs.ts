/*
 * @Date: 2024-07-26 13:57:27
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/button/configs.ts
 * @Description:
 */
import configs from '@shadow/components/button/configs.ts'
import { EButtonSize, EButtonType } from './types'

export const myConfigs: {
  buttonBackground: {
    [key in EButtonSize]?: {
      [key in EButtonType]?: string
    }
  }
} = {
  buttonBackground: {
    md: {
      default: require('./i/default-md.png?format=webp'),
      cancel: require('./i/cancel-md.png?format=webp'),
    },
    sm: {
      default: require('./i/default-sm.png?format=webp'),
      cancel: require('./i/cancel-sm.png?format=webp'),
    },
    lg: {
      default: require('./i/default-lg.png?format=webp'),
      cancel: require('./i/cancel-md.png?format=webp'),
    },
    xd: {
      default: require('./i/default-xd.png?format=webp'),
      cancel: require('./i/cancel-sm.png?format=webp'),
    },
    sd: {
      default: require('./i/default-disconfirm.png?format=webp'),
      cancel: require('./i/default-discancle.png?format=webp'),
    },
  },
  ...configs,
}

export default myConfigs
