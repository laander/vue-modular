import Todos from './Todos.vue'

export default {
  routes: [
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    }
  ],
  // router lifecycle hooks that can be used for navigation guards are supported as well
  beforeEach: (to, from, next) => {
    next()
  }
}
