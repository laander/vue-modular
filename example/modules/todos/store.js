export default {
  namespaced: true,
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    }
  },
  getters: {
    getTodos(state) {
      return state.todos
    }
  }
}
