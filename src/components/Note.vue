<script lang="ts">
// import { useStore } from "@/store";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Note",
  props: {
    note: Object
  },
  setup() {
    //  const store = useStore();

    return {};
  }
});
</script>

<template>
  <div class="note">
    {{ note.title }}: {{ note.text }}
    <div class="date">
      {{ note.iat }}
    </div>
  </div>
</template>

<style lang="scss">
.note {
  min-height: 200px;
}
</style>
