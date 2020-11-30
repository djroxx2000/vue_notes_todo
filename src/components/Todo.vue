<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  name: "Todo",
  props: {
    todo: Object
  },
  setup(props) {
    const store = useStore();
    const elements = reactive({
      content: props.todo ? props.todo.text : "",
      todoComplete: props.todo ? props.todo.completed : false,
      showTooltip: false,
      endDate: props.todo ? props.todo.end : "",
      showEdit: false
    });

    watch(
      () => elements.todoComplete,
      () => {
        if (props.todo) {
          console.log(elements.todoComplete);
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

    function editTodo(): void {
      console.log("changed");
      const index = store.state.todos.findIndex(todo =>
        props.todo ? todo.id == props.todo.id : false
      );
      store.state.todos[index].text = elements.content;
      store.state.todos[index].end = elements.endDate;
      if (props.todo) {
        store.dispatch(ActionTypes.editTodoItem, props.todo.id);
      }
      elements.showEdit = false;
    }

    function deleteTodo(): void {
      if (props.todo) {
        store.dispatch(ActionTypes.removeTodoItem, props.todo.id);
      }
    }
    return {
      elements,
      seeTodo,
      todoCompleteChange,
      deleteTodo,
      editTodo
    };
  }
});
</script>

<template>
  <div class="edit_todo" v-if="elements.showEdit">
    <div>
      <textarea
        style="padding: 5px;"
        rows="3"
        class="input"
        name="content"
        v-model="elements.content"
        placeholder="Type the task here and its end date below..."
      >
      </textarea>
    </div>
    <div>
      <input
        type="date"
        name="end-date"
        v-model="elements.endDate"
        class="input"
      />
    </div>
    <div class="add-new">
      <button class="input-btn full-width" @click="editTodo">
        Edit
      </button>
    </div>
  </div>
  <div
    class="todo_wrapper"
    @mouseenter="elements.showTooltip = true"
    @mouseleave="elements.showTooltip = false"
  >
    <div class="todo">
      <div
        class="todo_text"
        :class="{
          complete: elements.todoComplete,
          incomplete: !elements.todoComplete
        }"
      >
        <span>{{ todo.text }}</span>
      </div>
      <!-- <input
        type="checkbox"
        name="todo_check"
        v-model="elements.todoComplete"
      /> -->
      <div class="tooltip" v-if="elements.showTooltip">
        <i
          class="fas fa-times"
          v-if="elements.todoComplete"
          @click="elements.todoComplete = false"
        ></i>
        <i
          class="fas fa-check"
          v-if="!elements.todoComplete"
          @click="elements.todoComplete = true"
        ></i>
        <i
          class="fas fa-pen"
          @click="elements.showEdit = !elements.showEdit"
        ></i>
        <i class="fas fa-trash" @click="deleteTodo"></i>
      </div>
    </div>
    <div class="todo_info" v-if="todo.end != ''">End by: {{ todo.end }}</div>
    <div class="todo_info" v-else>End by: End of time</div>
  </div>
</template>

<style lang="scss">
.todo_wrapper {
  border-bottom: 1px solid black;
  position: relative;
  &:hover {
    .todo_info,
    .todo_text {
      filter: blur(2px);
    }
  }
}

.full-width {
  width: 100%;
  margin-top: 5px;
}

.todo {
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // position: relative;
  padding: 10px;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(84, 95, 84, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.fas {
  font-size: 115%;
  &:hover {
    cursor: pointer;
    transform: scale(1.4);
  }
}

.fa-trash {
  color: #e03f60;
}

.fa-check {
  color: #42b983;
}

.fa-pen {
  color: #88a6c7;
}

.incomplete {
  color: #e03f60;
}

.complete {
  text-decoration: line-through;
  color: #42b983;
  font-style: italic;
}

.todo_info {
  padding: 5px;
  display: flex;
  font-size: 70%;
  right: 0;
  flex-direction: row-reverse;
}

.edit_modal {
  margin-top: 10px;
  padding: 5px;
}
</style>
