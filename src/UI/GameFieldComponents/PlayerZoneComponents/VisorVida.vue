<template>
  <div data-jugador-vida class="VisorVida">
    <span>
      {{ Vida.toString() }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VisorVida",
  props: {
    Vida: {
      type: Number,
      required: false,
      default: -1,
    },
  },
});
</script>

<style scoped></style>
