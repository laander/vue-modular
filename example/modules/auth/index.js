import store from './store'
import router from './router'

export default {
  store,
  router,
  // you can add custom data in any shape you want that can be access with vm.$modules.auth.custom inside other components
  custom: {
    foo: 'bar'
  }
}
