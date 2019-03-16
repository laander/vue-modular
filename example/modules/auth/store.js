export default {
  // remember to namespace your vuex modules to avoid naming collisions
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
