<template>
  <div data-game-frame-menu-acciones class="AccionesJugador">
    <button data-menu-acciones-draw @click="Jugador?.mazo.drawCard()" :disabled="!Jugador?.isActive">DRAW</button>
    <button
      data-menu-acciones-doblar
      @click="
        Jugador?.mazo.drawCard();
        Jugador?.finalizarTurno();
      "
      :disabled="!Jugador?.isActive"
    >
      DOBLAR
    </button>
    <button data-menu-acciones-pasar @click="Jugador?.finalizarTurno()" :disabled="!Jugador?.isActive">PASAR</button>
  </div>
</template>

<script lang="ts">
import { IPlayer } from "@/Controladores/Player";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "AccionesJugador",
  props: {
    Jugador: {
      type: Object as PropType<IPlayer>,
      required: false,
    },
  },
});
</script>

<style scoped></style>
