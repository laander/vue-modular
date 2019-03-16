import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import plugin and static modules to load
import VueModular, { registerModules } from '../lib'
import auth from './modules/auth'

// use the plugin and pass modules, vuex store and vue router
Vue.use(VueModular, {
  modules: { auth },
  store,
  router
})

// lazily import a module asynchronously and register it
setTimeout(async () => {
  const { default: todos } = await import('./modules/todos')
  registerModules({ todos })
}, 1000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
