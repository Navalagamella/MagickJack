<template>
  <div :data-game-field="Jugador?.tipoJugador || 'NOT_SET'" class="PlayerZone">
    <VisorDescarte :Cartas="Jugador?.mazo.descarte" />
    <VisorMazo :CartasEnMazo="Jugador?.mazo.numeroCartasEnMazo" />
    <ZonaJuego :Cartas="Jugador?.mazo.enJuego" />
    <VisorVida :Vida="Jugador?.vida" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { IPlayer } from "@/Controladores/Player";
import VisorVida from "./PlayerZoneComponents/VisorVida.vue";
import VisorMazo from "./PlayerZoneComponents/VisorMazo.vue";
import VisorDescarte from "./PlayerZoneComponents/VisorDescarte.vue";
import ZonaJuego from "./PlayerZoneComponents/ZonaJuego.vue";
export default defineComponent({
  name: "PlayerZone",
  components: { VisorVida, VisorMazo, VisorDescarte, ZonaJuego },
  props: {
    Jugador: {
      type: Object as PropType<IPlayer>,
      required: false,
    },
  },
});
</script>

<style scoped></style>
