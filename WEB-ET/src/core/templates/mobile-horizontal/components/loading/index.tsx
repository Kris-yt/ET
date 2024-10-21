/*
 * @Date: 2024-08-05 09:59:44
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/loading/index.tsx
 * @Description:
 */

import Lottie from 'react-lottie'
import animationData from '@/assets/loading.json'
export default () => {
  const defaultOptions = {
    loop: true, // 是否循环
    autoplay: true, // 是否自动播放
    animationData: animationData, // 动画数据
  }
  return <Lottie options={defaultOptions} height={150} width={150} />
}
