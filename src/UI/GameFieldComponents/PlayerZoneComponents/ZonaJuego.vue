<template>
  <div data-jugador-juego>
    <div
      v-for="(carta, index) in Cartas"
      :key="index"
      data-jugador-juego-carta
      :class="carta.faceDown ? 'faceDown' : 'faceUp'"
    >
      {{ carta.valor }}
    </div>
  </div>
</template>

<script lang="ts">
import { ICartasEnMazo } from "@/Controladores/Mazo";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "ZonaJuego",
  props: {
    Cartas: {
      type: Array as PropType<ICartasEnMazo[]>,
      required: false,
      default: () => [],
    },
  },
});
</script>

<style scoped></style>
