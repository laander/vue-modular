<template>
  <div class="app">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <!-- you can link to routes in modules that are loaded asynchronously -->
      <router-link to="/todos">Todos</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
  color: #2c3e50;
}
.nav {
  padding: 30px 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 15px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
