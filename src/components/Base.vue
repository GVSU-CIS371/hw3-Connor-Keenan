<template>
  <div 
    class="baseBeverage" 
    :style="{ backgroundColor: beverageStore.currentBase?.color || 'transparent' }"
  ></div>
</template>

<script setup lang="ts">
import { useBeverageStore } from "../stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;
}
</style>
