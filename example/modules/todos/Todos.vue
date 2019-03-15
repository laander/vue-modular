<template>
  <div>
    <h2>Todos</h2>
    <ul>
      <li
        v-for="(todo, index) in $store.getters['todos/getTodos']"
        :key="index"
      >
        {{ todo }}
      </li>
    </ul>
    <a href @click.prevent="$store.commit('todos/addTodo', Math.random())"
      >Add new todo</a
    >
  </div>
</template>
