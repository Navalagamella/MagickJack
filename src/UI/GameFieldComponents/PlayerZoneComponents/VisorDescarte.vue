<template>
  <div data-jugador-descarte class="VisorDescarte">
    <div class="text-center">
      {{ Cartas.length }}
    </div>
  </div>
</template>

<script lang="ts">
import { ICartasEnMazo } from "@/Controladores/Mazo";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "VisorDescarte",
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
