<script lang="ts">
import { defineComponent } from "vue";

import Todos from "@/components/Todos.vue";
import Input from "@/components/Input.vue";
import Note from "@/components/Note.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  name: "Home",
  components: {
    Todos,
    Input,
    Note
  },
  props: {
    msg: String
  },
  setup() {
    const store = useStore();

    function setIDB() {
      console.log(store.state.todos);
      store.dispatch(ActionTypes.removeTodoItem, 3);
    }

    function getIDB() {
      store.dispatch(ActionTypes.getTodoItems, undefined);
    }

    return {
      store,
      setIDB,
      getIDB
    };
  }
});
</script>

<template>
  <div class="home">
    <div class="navbar">
      Notes / Todos
      <!-- <button class="btn" @click="setIDB">Switch?</button>
      <button class="btn" @click="getIDB">Theme?</button> -->
    </div>
    <div class="grid-wrapper">
      <div class="left-bar">
        <Input class="input-box" />
        <Todos class="todos-box" />
      </div>
      <div class="right-bar">
        <div class="notes-box">
          <Note v-for="note in store.state.notes" :key="note.id" :note="note" />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  height: 100%;
}

.navbar {
  background: #2c3e50;
  color: white;
  font-size: 1.5em;
  padding: 10px;
  // display: flex;
  // flex-direction: row-reverse;
  // align-content: center;
  text-align: center;
}

.btn {
  padding: 7px;
  margin-left: 5px;
  border: 0;
  border-radius: 2px;
  background: #42b983;
  &:hover {
    cursor: pointer;
  }
}

.grid-wrapper {
  height: 93%;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 3fr);
}
.left-bar {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.input-box {
  margin-bottom: 5px;
}

.todos-box {
  flex-grow: 1;
}

.right-bar {
  // width: auto;
  margin: 10px;
  margin-left: 5px;
  overflow-y: auto;
  border: 1px solid black;
  border-radius: 6px;
}

.notes-box {
  height: 100%;
  display: grid;
  // overflow-y: scroll;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
}

@media screen and (max-width: 625px) {
  .home {
    padding: 0px;
  }
  .grid-wrapper {
    height: 100%;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    // grid-template-rows: repeat(auto-f, minmax(400px, 1fr));
  }
  .right-bar {
    overflow-y: visible;
    margin: 10px;
  }
  .notes-box {
    display: block;
  }
}
</style>
