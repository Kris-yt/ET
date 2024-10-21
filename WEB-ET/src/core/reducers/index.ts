/*
 * @Date: 2024-08-02 18:46:40
 * @FilePath: /AS-WEB-3.5/src/core/reducers/index.ts
 * @Description:
 */
import { combineReducers } from 'redux'

import base from './baseReducer'
import user from './userReducer'

const rootReducer = combineReducers({
  base,
  user,
})

export default rootReducer
