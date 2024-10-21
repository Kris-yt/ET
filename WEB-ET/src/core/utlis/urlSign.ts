/*
 * @Date: 2024-08-07 18:23:55
 * @FilePath: /AS-WEB-3.5/src/core/utlis/urlSign.ts
 * @Description:
 */
import forge from 'node-forge'

export default (url: string) => {
  const hmac = forge.hmac.create()
  const key = 'vVdKN0TqbXgZm64d'
  const signTs = Math.floor(Date.now() / 1000)
  hmac.start('sha256', key)
  const text = signTs + '\n' + url.replace('_api_', '')
  hmac.update(text)
  const sign = hmac.digest().toHex()
  return {
    signTs,
    sign,
  }
}
