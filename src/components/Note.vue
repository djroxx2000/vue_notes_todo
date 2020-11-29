<script lang="ts">
// import { useStore } from "@/store";
import { defineComponent, reactive } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
export default defineComponent({
  name: "Note",
  props: {
    note: Object
  },
  setup(props) {
    const store = useStore();
    const elements = reactive({
      showEdit: false,
      content: props.note ? props.note.text : "",
      title: props.note ? props.note.title : "",
      iat: props.note ? props.note.iat : ""
    });

    function deleteNote(): void {
      if (props.note) {
        store.dispatch(ActionTypes.removeNoteItem, props.note.id);
      }
    }

    function editNote(): void {
      const index = store.state.notes.findIndex(note =>
        props.note ? note.id == props.note.id : false
      );
      store.state.notes[index].text = elements.content;
      store.state.notes[index].title = elements.title;
      if (props.note) {
        store.dispatch(ActionTypes.editNoteItem, props.note.id);
      }
      elements.showEdit = false;
    }

    return { elements, deleteNote, editNote };
  }
});
</script>

<template>
  <div class="note" v-if="!elements.showEdit">
    <div class="top_bar">
      <div class="note_title">
        {{ note.title }}
      </div>
      <div class="note_tooltip">
        <i
          class="fas fa-pen"
          @click="elements.showEdit = !elements.showEdit"
        ></i>
        <i class="fas fa-trash" @click="deleteNote"></i>
      </div>
    </div>
    <div class="note_content">
      {{ note.text }}
    </div>
    <div class="date">
      {{ note.iat }}
    </div>
  </div>
  <div class="edit_note note" v-if="elements.showEdit">
    <div class="top_bar">
      <div class="note_title full-width">
        <input type="text" v-model="elements.title" class="input" />
      </div>
      <div class="note_tooltip">
        <i class="fas fa-check" @click="editNote"></i>
      </div>
    </div>
    <div class="note_content">
      <textarea
        name="note_text"
        v-model="elements.content"
        style="padding: 5px; width: 90%; height: 80%;"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss">
.note {
  margin: 5px;
  padding: 5px;
  min-height: 200px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  * {
    margin: 2px;
  }
}
.top_bar {
  display: flex;
  justify-content: space-between;
}
.note_title {
  font-weight: bold;
}
.note_content {
  flex-grow: 1;
  overflow: auto;
}
.fas {
  margin-left: 25px;
}
.date {
  text-align: center;
}
</style>
