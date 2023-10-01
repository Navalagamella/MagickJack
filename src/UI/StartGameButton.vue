<template>
  <button data-play-button class="btn StartGameButton" id="btn-start" @click="$emit('start')">Play</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["start"],
  name: "StartGameButton",
});
</script>

<style scoped lang="scss">
@import "@/App.scss";
/* Colors */
$white: #ffffea;
$red: #ff5e5b;
$blue: #00cecb;
$yellow: #ffed66;

@mixin transform($transforms) {
  -moz-transform: $transforms;
  -o-transform: $transforms;
  -ms-transform: $transforms;
  -webkit-transform: $transforms;
  transform: $transforms;
}

/* Buttons */

.btn {
  display: inline-block;
  background-color: $yellow;
  padding: 15px 40px;
  border: none;
  border-radius: 30px;

  font-size: 20px;
  text-decoration: none;
  text-transform: uppercase;
  color: $red;

  box-shadow: 0 3px 0 $red;
  cursor: pointer;
  transition: all 100ms linear;

  &:hover {
    @include transform(translateY(-4px));
    box-shadow: 0 7px 0 $red;
    background-color: $white;
  }

  &:focus {
    outline: 0;
  }
}
</style>
