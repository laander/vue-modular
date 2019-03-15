export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
}
