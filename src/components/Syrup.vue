<template>
  <div 
    class="syrup" 
    :style="{ 
      backgroundColor: beverageStore.currentSyrup?.color || 'transparent' 
    }"
  ></div>
</template>

<script setup lang="ts">
import { useBeverageStore } from "../stores/beverageStore";
const beverageStore = useBeverageStore();
</script>

<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  background-color: #c6c6c6;
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
  transition: background-color 0.5s;
}

.drizzle {
  position: absolute;
  width: 60%;
  height: 35px;
  top: -30px;
  left: 20%;
  clip-path: polygon(
    0% 100%, 
    20% 0%, 
    25% 100%, 
    40% 50%, 
    45% 100%, 
    60% 20%, 
    65% 100%, 
    80% 40%, 
    85% 100%, 
    100% 10%, 
    100% 100%
  );
  transition: background-color 0.5s;
}
</style>