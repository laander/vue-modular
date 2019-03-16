import Login from './Login.vue'

export default {
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      // also works with dynamic imports for code splitting
      component: () => import('./Logout.vue')
    }
  ]
}
