<template>
  <div data-round class="VisorRonda">
    <div data-round-view>{{ Ronda }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameField",
  props: {
    Ronda: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
