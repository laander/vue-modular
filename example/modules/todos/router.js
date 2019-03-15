import Todos from './Todos.vue'

export default {
  routes: [
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    }
  ],
  beforeEach: (to, from, next) => {
    next()
  }
}
