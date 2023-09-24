<template>
  <div data-game-frame class="GameFrame">
    <div class="always-top center-page center-offset" v-if="!bIsJuegoIniciado">
      <!-- - MENU INICIO JUEGO - -->
      <StartGameButton @start="bIsJuegoIniciado = !bIsJuegoIniciado" />
    </div>

    <div class="always-top p-1 center-page center-offset" v-else>
      <!-- - CONTENEDOR PRINCIPAL - -->
      <slot> </slot>
    </div>

    <div class="keyart" id="parallax">
      <!-- - BACKGROUND - -->
      <div class="keyart_layer parallax" v-if="Background.keyArts['fondo']" id="keyart-0" data-speed="2"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['backLayer1']" id="keyart-1" data-speed="5"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['backLayer2']" id="keyart-2" data-speed="11"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['backLayer3']" id="keyart-3" data-speed="16"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['backLayer4']" id="keyart-4" data-speed="26"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['topLayer1']" id="keyart-5" data-speed="36"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['topLayer2']" id="keyart-6" data-speed="49"></div>
      <div class="keyart_layer" id="keyart-scrim"></div>
      <div class="keyart_layer parallax" v-if="Background.keyArts['topLayer3']" id="keyart-7" data-speed="69"></div>
      <div class="keyart_layer" v-if="Background.keyArts['topLayer4']" id="keyart-8" data-speed="100"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Background } from "@/Controladores/Background";
import StartGameButton from "./StartGameButton.vue";
import { GameMode } from "@/Controladores/GameMode";

export default defineComponent({
  name: "GameFrame",
  components: { StartGameButton },
  data() {
    return {
      Background: Background,
      GameMode: GameMode,
      bIsJuegoIniciado: false,
    };
  },
});
</script>

<style scoped>
.keyart,
.keyart_layer {
  height: 100%;
}

#parallax {
  display: block;
}

.keyart {
  position: relative;
  z-index: 10;
}

.keyart_layer {
  background-position: bottom center;
  background-size: auto 1038px;
  background-repeat: repeat-x;
  width: 100%;
  position: absolute;
  pointer-events: none;
}

.keyart_layer.parallax {
  position: fixed;
}

#keyart-0 {
  background-image: url("~@/assets/parallax0.png");
  background-color: #ffaf1b;
}

#keyart-1 {
  background-image: url("~@/assets/parallax1.png");
}

#keyart-2 {
  background-image: url("~@/assets/parallax2.png");
}

#keyart-3 {
  background-image: url("~@/assets/parallax3.png");
}

#keyart-4 {
  background-image: url("~@/assets/parallax4.png");
}

#keyart-5 {
  background-image: url("~@/assets/parallax5.png");
}

#keyart-6 {
  background-image: url("~@/assets/parallax6.png");
}

#keyart-7 {
  background-image: url("~@/assets/parallax7.png");
}

#keyart-8 {
  background-image: url("~@/assets/parallax8.png");
}

#keyart-scrim {
  background-color: #ffaf00;
  opacity: 0;
}
</style>
