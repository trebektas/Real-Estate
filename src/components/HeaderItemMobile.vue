<script setup>
import HomeActive from '../assets/mobile/navigation_home_active.png'
import Home from '../assets/mobile/navigation_home.png'
import InfoActive from '../assets/mobile/navigation_info_active.png'
import Info from '../assets/mobile/navigation_info.png'

import { ref } from 'vue'
const activeHomeIcon = ref(true)
</script>

<template>
  <nav class="navigation-mobile">
    <RouterLink to="/" class="router-home">
      <img
        @click="activeHomeIcon = true"
        v-if="activeHomeIcon"
        :src="HomeActive"
        alt="Active Home Icon"
      />
      <img @click="activeHomeIcon = true" v-if="!activeHomeIcon" :src="Home" alt="Home Icon" />
    </RouterLink>
    <RouterLink to="/about">
      <img
        @click="activeHomeIcon = false"
        v-if="!activeHomeIcon"
        :src="InfoActive"
        alt="Active Info Icon"
      />
      <img @click="activeHomeIcon = false" v-if="activeHomeIcon" :src="Info" alt="Info Icon" />
    </RouterLink>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.navigation-mobile {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 15vh;
  position: fixed;
  bottom: 0;
  background-color: var(--element-background-2);
}

a img {
  width: 2rem;
}
</style>
