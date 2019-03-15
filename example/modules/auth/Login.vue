<template>
  <div>
    <p v-if="$store.getters['auth/getUser']">
      Current user:
      <b>{{ $store.getters['auth/getUser'] }}</b>
    </p>
    <p v-else>
      <a href @click.prevent="$store.commit('auth/updateUser', 'John Doe')"
        >Login as John Doe</a
      >
    </p>
  </div>
</template>
