<script lang="ts">
import { defineComponent, reactive } from "vue";

import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  name: "Input",
  setup() {
    const store = useStore();

    const elements = reactive({
      isTodo: true,
      isNote: false,
      content: "",
      endDate: "",
      title: ""
    });

    function selectNoteType(clicked: string) {
      if (clicked == "todo") {
        elements.isTodo = true;
        elements.isNote = false;
      } else {
        elements.isNote = true;
        elements.isTodo = false;
      }
    }

    function addNew() {
      if (elements.isTodo) {
        const newTodo = { id: 0, text: " ", completed: false, end: " " };

        if (store.state.todos.length > 0) {
          const newId =
            store.state.todos[0].id >
            store.state.todos[store.state.todos.length - 1].id
              ? store.state.todos[0].id + 1
              : store.state.todos[store.state.todos.length - 1].id + 1;
          newTodo.id = newId;
        }
        newTodo.text = elements.content;
        newTodo.end = elements.endDate;

        store.commit(MutationTypes.createTodo, newTodo);
        store.dispatch(ActionTypes.setTodoItems, undefined);

        elements.content = "";
        elements.endDate = "";
      } else {
        const newNote = { id: 0, text: " ", iat: " ", title: " " };

        if (store.state.notes.length > 0) {
          const newId =
            store.state.notes[0].id >
            store.state.notes[store.state.notes.length - 1].id
              ? store.state.notes[0].id + 1
              : store.state.notes[store.state.notes.length - 1].id + 1;
          newNote.id = newId;
        }
        newNote.text = elements.content;
        newNote.title = elements.title;
        const today = new Date();
        newNote.iat =
          today.getHours() +
          ":" +
          today.getMinutes() +
          // ":" +
          " | " +
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();

        store.commit(MutationTypes.createNote, newNote);
        store.dispatch(ActionTypes.setNoteItems, undefined);

        elements.content = "";
        elements.title = "";
      }
    }

    return {
      elements,
      selectNoteType,
      addNew
    };
  }
});
</script>

<template>
  <div class="input-container">
    <div class="full-width">
      <input
        type="text"
        name="title"
        v-model="elements.title"
        v-if="elements.isNote"
        class="input"
        placeholder="Title"
      />
    </div>
    <div class="content-div" v-if="elements.isTodo">
      <textarea
        style="padding: 5px;"
        name="content"
        id="content-input"
        v-model="elements.content"
        placeholder="Type the task here and its end date below..."
      >
      </textarea>
    </div>
    <div class="content-div" v-if="elements.isNote">
      <textarea
        style="padding: 5px;"
        name="content"
        id="content-input"
        v-model="elements.content"
        placeholder="Need me to remember something?"
      >
      </textarea>
    </div>
    <div class="full-width" v-if="elements.isTodo">
      <input
        type="date"
        name="end-date"
        v-model="elements.endDate"
        class="input"
      />
    </div>
    <div class="switch-div">
      <button
        class="input-btn"
        :class="{ selected: elements.isTodo }"
        id="todo-btn"
        @click="selectNoteType('todo')"
      >
        To-do
      </button>
      <button
        class="input-btn"
        :class="{ selected: elements.isNote }"
        id="note-btn"
        @click="selectNoteType('note')"
      >
        Note
      </button>
    </div>
    <div class="add-new">
      <button class="input-btn full-width" @click="addNew">
        Add
      </button>
    </div>
  </div>
</template>

<style lang="scss">
#content-input {
  width: 96%;
  height: 175px;
}

.switch-div {
  width: 100%;
}

.input {
  width: 95%;
  padding: 5px;
  margin-bottom: 5px;
}

.input-btn {
  margin-bottom: 5px;
  width: 50%;
  border-radius: 0;
  font-weight: bold;
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  color: #2c3e50;
  background: white;

  &:hover {
    border-radius: 0;
    cursor: pointer;
    background: #42b983;
  }
  transition: background 400ms;
}

.full-width {
  width: 100%;
}

.selected {
  color: #42b983;
  background: #2c3e50;

  &:hover {
    color: #42b983;
    background: #2c3e50;
  }
}

@media screen and (max-width: 625px) {
  .input {
    width: 96%;
  }
}
</style>
