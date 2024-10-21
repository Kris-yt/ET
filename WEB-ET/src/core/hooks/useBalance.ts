/*
 * @Date: 2024-08-07 10:12:18
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useStateKeeper.ts
 * @Description:
 */

export default () => {
  const toDecimal = (balance: any) => {
    let result = parseFloat(balance)
    if (isNaN(result)) {
      alert($t('金额错误'))
      return false
    }
    result = Math.floor(balance * 100) / 100
    let s_x = result.toString() //将数字转换为字符串

    let pos_decimal = s_x.indexOf('.') //小数点的索引值

    // 当整数时，pos_decimal=-1 自动补0
    if (pos_decimal < 0) {
      pos_decimal = s_x.length
      s_x += '.'
    }

    // 当数字的长度< 小数点索引+2时，补0
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0'
    }
    return s_x
  }
  return {
    toDecimal,
  }
}
