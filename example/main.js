import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import packageLoader from '../lib'
import auth from './modules/auth'
import todos from './modules/todos'

Vue.use(packageLoader, {
  modules: { auth, todos },
  // modules: () => require.context('./packages/', true, /\/index\.js$/),
  store,
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
