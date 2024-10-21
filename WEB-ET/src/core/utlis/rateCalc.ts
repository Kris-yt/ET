/*
 * @Date: 2024-08-07 12:09:18
 * @FilePath: /AS-WEB-3.5/src/core/utlis/rateCalc.ts
 * @Description:
 */

/**
 *
 * @param w 宽度
 * @param h 高度
 * @returns
 */
export const caclWithWidth = (w: number, h: number) => {
  const width = window.innerWidth > window.innerHeight ? 812 : 375
  return {
    width: `${w * (window.innerWidth / width)}px`,
    height: `${h * (window.innerWidth / width)}px`,
  }
}

/**
 *
 * @param w 宽度
 * @param h 高度
 * @returns
 */
export const caclWithHeight = (w: number, h: number) => {
  const height = window.innerWidth > window.innerHeight ? 375 : 812
  return {
    width: `${w * (window.innerHeight / height)}px`,
    height: `${h * (window.innerHeight / height)}px`,
  }
}
