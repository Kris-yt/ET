/*
 * @Date: 2024-07-24 17:19:00
 * @FilePath: /AS-WEB-3.5/src/core/utlis/remSet.ts
 * @Description:
 */

export default () => {
  const docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      const clientWidth = docEl.clientWidth
      const clientHeight = docEl.clientHeight
      const targetSize = clientWidth > clientHeight ? clientHeight : clientWidth
      const orientation = clientWidth > clientHeight ? 'landscape' : 'portrait'
      // 相同方向的 resize 事件不做处理
      if (window.__orientation === orientation) {
        return
      }
      window.__orientation =
        clientWidth > clientHeight ? 'landscape' : 'portrait'
      docEl.style.fontSize = 16 * (targetSize / 375) + 'px'
      document.body.style.height = docEl.clientHeight + 'px'
      document.body.style.width = docEl.clientWidth + 'px'
      document.body.style.overflow = 'hidden'
    }
  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
  recalc()
}
