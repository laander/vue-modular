<template>
  <div>
    <h2>Hello!</h2>
    <p>Custom key from todos module:</p>
    <code>{{ todosCustom }}</code>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    todosCustom() {
      return this.$modules.get('todos').custom
    }
  }
}
</script>
