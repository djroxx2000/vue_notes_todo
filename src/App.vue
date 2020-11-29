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
    });
  }
});
</script>

<template>
  <Home />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap");

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

#app {
  height: 100vh;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #42b983;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c3e50;
}
</style>
