import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueModular from '../lib'
import auth from './modules/auth'
import todos from './modules/todos'

Vue.use(VueModular, {
  modules: {
    auth,
    todos
  },
  store,
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
