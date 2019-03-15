<template>
  <div>
    <p v-if="!$store.getters['auth/getUser']">Not currently logged in</p>
    <p v-else>
      <a href @click.prevent="$store.commit('auth/updateUser', null)"
        >Logout now</a
      >
    </p>
  </div>
</template>
