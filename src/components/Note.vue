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
      showEdit: false
    });

    function deleteNote(): void {
      if (props.note) {
        store.dispatch(ActionTypes.removeNoteItem, props.note.id);
      }
    }

    return { elements, deleteNote };
  }
});
</script>

<template>
  <div class="note">
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
