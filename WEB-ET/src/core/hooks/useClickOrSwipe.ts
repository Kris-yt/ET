/*
 * @Date: 2024-10-11 16:58:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useClickOrSwipe.ts
 * @Description: 滑动和点击事件区分封装
 */
import { useState, useRef } from 'react'

const useClickOrSwipe = (onClick, onSwipe) => {
  const [isMoving, setIsMoving] = useState(false) // 判断是否在滑动
  const startX = useRef(0) // 存储触摸起始点的 X 坐标
  const startY = useRef(0) // 存储触摸起始点的 Y 坐标
  const startTime = useRef(0) // 存储触摸的起始时间

  // 触摸开始
  const handleTouchStart = (e) => {
    setIsMoving(false) // 初始化滑动状态
    startX.current = e.touches[0].pageX
    startY.current = e.touches[0].pageY
    startTime.current = new Date().getTime()
  }

  // 触摸移动
  const handleTouchMove = (e) => {
    const moveX = e.touches[0].pageX
    const moveY = e.touches[0].pageY

    // 如果移动距离超过一定阈值，认为是滑动
    if (
      Math.abs(moveX - startX.current) > 10 ||
      Math.abs(moveY - startY.current) > 10
    ) {
      setIsMoving(true)
    }
  }

  // 触摸结束
  const handleTouchEnd = (item?: any) => {
    const endTime = new Date().getTime()
    const timeDiff = endTime - startTime.current

    // 如果移动距离小且时间短，认为是点击
    if (!isMoving && timeDiff < 200) {
      if (onClick) onClick(item) // 触发点击事件回调
    } else {
      if (onSwipe) onSwipe(item) // 触发滑动事件回调
    }
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}

export default useClickOrSwipe
