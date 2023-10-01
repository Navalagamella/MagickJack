<template>
  <div data-game-field class="GameField">
    <PlayerZone :Jugador="GameMode.oponente">
      <!-- - Zona del oponente - -->
    </PlayerZone>

    <PlayerZone :Jugador="GameMode.jugador">
      <!-- - Zona del jugador - -->
    </PlayerZone>

    <VisorRonda :Ronda="GameMode.ronda.toString()" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { IGameMode } from "@/Controladores/GameMode";
import VisorRonda from "./VisorRonda.vue";
import PlayerZone from "./GameFieldComponents/PlayerZone.vue";
export default defineComponent({
  name: "GameField",
  components: { VisorRonda, PlayerZone },
  props: {
    GameMode: {
      type: Object as PropType<IGameMode>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
