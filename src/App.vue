<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";

import Home from "@/components/Home.vue";

import { useStore } from "@/store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  name: "App",
  components: {
    Home
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch(ActionTypes.getTodoItems, undefined);
      store.dispatch(ActionTypes.getNoteItems, undefined);

      // TODO: put these 2 in an interval loop or change set todo item mutation
      // window.addEventListener("beforeunload", evt => {
      //   evt.preventDefault();
      //   store.dispatch(ActionTypes.setTodoItems, undefined);
      //   store.dispatch(ActionTypes.setNoteItems, undefined);
      // });
    });
  }
});
</script>

<template>
  <Home />
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
}
</style>
