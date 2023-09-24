<template>
  <div data-game-field class="GameField">GameField</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GameMode } from "@/Controladores/GameMode";

export default defineComponent({
  name: "GameField",
  data() {
    return {
      GameMode: GameMode,
    };
  },
});
</script>

<style scoped></style>
