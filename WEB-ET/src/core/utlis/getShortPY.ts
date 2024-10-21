import _ from 'lodash'

export const getShortPY = (e: any, t: any) => {
  let n = 1
  if (!String.prototype.localeCompare)
    throw Error('String.prototype.localeCompare not supported.')
  ;(t = _.toUpper(t)), (e = _.toUpper(e))
  const a = _(t.split(''))
    .map(function (e) {
      if (/[^\u4e00-\u9fa5]/.test(e)) return e
      for (
        let t = 0;
        t < '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳'.length;
        t++
      )
        if (
          '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳'[t].localeCompare(
            e,
            'zh-CN-u-co-pinyin',
          ) >= 0
        ) {
          n = t
          break
        }
      return 'ABCDEFGHJKLMNOPQRSTWXYZ'[n]
    })
    .value()
    .join('')
  if (_.includes(t, e)) return !0
  if (-1 != a.replace(/\s+/g, '').indexOf(e.toUpperCase().replace(/\s+/g, '')))
    return !0
  return !1
}
