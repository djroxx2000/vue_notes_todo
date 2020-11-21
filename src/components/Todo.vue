<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";
import { TodoItem } from "@/store/state";

export default defineComponent({
  name: "Todo",
  props: {
    todo: Object
  },
  setup(props) {
    const store = useStore();
    const elements = reactive({
      todoComplete: props.todo ? props.todo.completed : false
    });

    watch(
      () => elements.todoComplete,
      () => {
        if (props.todo) {
          store.dispatch(ActionTypes.completeTodoItem, props.todo);
        }
      }
    );

    function seeTodo(): void {
      console.log(props.todo);
    }

    function todoCompleteChange(): void {
      console.log(!elements.todoComplete);
      if (props.todo) {
        store.commit(MutationTypes.completeTodo, props.todo.id);
      }
    }
    return {
      elements,
      seeTodo,
      todoCompleteChange
    };
  }
});
</script>

<template>
  <div class="todo">
    <div class="todo-text" :class="{ complete: elements.todoComplete }">
      {{ todo.text }}
    </div>
    <input type="checkbox" name="todo_check" v-model="elements.todoComplete" />
  </div>
</template>

<style lang="scss">
.todo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.complete {
  text-decoration: line-through;
}
</style>
