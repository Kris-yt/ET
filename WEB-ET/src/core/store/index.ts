/*
 * @Date: 2024-08-03 09:54:50
 * @FilePath: /AS-WEB-3.5/src/core/store/index.ts
 * @Description:
 */

import { configureStore } from '@reduxjs/toolkit'

import request from '@/core/middleware/request'
import relations from '@/core/middleware/relations'
import rootReducer from '../reducers'

export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(request, relations),
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}
