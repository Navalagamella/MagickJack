<template>
  <GameFrame :GameMode="gameMode">
    <GameField :GameMode="gameMode" />
  </GameFrame>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameFrame from "@/UI/GameFrame.vue";
import GameField from "./UI/GameField.vue";
import { cGameMode } from "./Controladores/GameMode";
export default defineComponent({
  name: "App",
  components: { GameFrame, GameField },
  data() {
    return {
      gameMode: new cGameMode(),
    };
  },
});
</script>
