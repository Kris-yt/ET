/*
 * @Date: 2024-08-02 18:46:40
 * @FilePath: /AS-WEB-3.5/src/core/reducers/initialState.ts
 * @Description:
 */
import TStore, { TBase, TUser } from './types'

const base: TBase = {
  loading: { display: false },
  modal: { display: false },
  toast: { types: 'info', text: '', tirgger: 0 },
  route: { prev: '/home', current: '' },
}

const user: TUser = {
  info: Store.localStorage.get('userProfile') || {},
}

const store: TStore = {
  base,
  user,
}

export default store
