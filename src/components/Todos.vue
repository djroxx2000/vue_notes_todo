<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "@/store";

import Todo from "@/components/Todo.vue";

export default defineComponent({
  name: "Todos",
  components: {
    Todo
  },
  props: {
    msg: String
  },
  setup() {
    const store = useStore();

    const completeTodos = computed(() => {
      const complete = store.state.todos.filter(todo => todo.completed);
      return complete;
    });

    const incompleteTodos = computed(() => {
      const incomplete = store.state.todos.filter(todo => !todo.completed);
      return incomplete;
    });

    return {
      completeTodos,
      incompleteTodos
    };
  }
});
</script>

<template>
  <div id="todos">
    <Todo v-for="todo in incompleteTodos" :key="todo.id" :todo="todo" />
    <Todo v-for="todo in completeTodos" :key="todo.id" :todo="todo" />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#todos {
  border: 1px solid black;
  overflow-y: scroll;
  height: 390px;
}
@media screen and (max-width: 625px) {
  #todos {
    height: 100%;
    overflow-y: visible;
  }
}
</style>
