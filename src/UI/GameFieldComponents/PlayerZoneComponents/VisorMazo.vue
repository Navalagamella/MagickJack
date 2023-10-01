<template>
  <div data-jugador-mazo class="VisorMazo">
    <div class="text-center">
      {{ CartasEnMazo }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VisorMazo",
  props: {
    CartasEnMazo: { type: Number, required: false, default: 0 },
  },
});
</script>

<style scoped></style>
