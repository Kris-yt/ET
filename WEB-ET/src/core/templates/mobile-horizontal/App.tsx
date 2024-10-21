/*
 * @Date: 2024-07-23 17:28:32
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/App.tsx
 * @Description:
 */
import { Provider } from 'react-redux'
import { configureAppStore } from '@/core/store'
import Framework from '@shadow/components/main-framework'
import Routes from '@this/pages/router/index'
import './style/main.scss'

const store = configureAppStore()

export default () => {
  return (
    <Provider store={store}>
      <Framework>
        <Routes />
      </Framework>
    </Provider>
  )
}
