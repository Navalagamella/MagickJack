<template>
  <div data-game-frame-menu-acciones class="AccionesJugador">
    <button data-menu-acciones-draw>DRAW</button>
    <button data-menu-acciones-doblar>DOBLAR</button>
    <button data-menu-acciones-pasar>PASAR</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccionesJugador",
});
</script>

<style scoped></style>
