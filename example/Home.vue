<template>
  <div>
    <h2>Hello!</h2>
    <p>Custom key from auth module:</p>
    <code>{{ todosCustom }}</code>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    todosCustom() {
      // access exported module data through the plugin's helper property
      return this.$modules.auth.custom
    }
  }
}
</script>
