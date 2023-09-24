<template>
  <GameFrame>
    <GameField />
  </GameFrame>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameFrame from "@/UI/GameFrame.vue";
import GameField from "./UI/GameField.vue";
export default defineComponent({
  name: "App",
  components: { GameFrame, GameField },
});
</script>
