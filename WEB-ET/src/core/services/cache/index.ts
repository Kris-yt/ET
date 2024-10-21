/*
 * @Date: 2024-08-02 15:38:44
 * @FilePath: /AS-WEB-3.5/src/core/services/cache/index.ts
 * @Description:
 */
import cookies from 'js-cookie'
import localStorage from './localStorage'
import sessionStorage from './sessionStorage'

export default {
  cookies,
  localStorage,
  sessionStorage,
}
