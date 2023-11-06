<script setup>
import HomeActive from '../assets/icons/ic_mobile_navigarion_home_active@3x.png'
import Home from '../assets/icons/ic_mobile_navigarion_home@3x.png'
import InfoActive from '../assets/icons/ic_mobile_navigarion_info_active@3x.png'
import Info from '../assets/icons/ic_mobile_navigarion_info@3x.png'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteIsAbout = ref(false)

// Update currentRouteIsAbout ref value whenever route name changes
watch(
  () => route.name,
  () => {
    route.name === 'about'
      ? (currentRouteIsAbout.value = true)
      : (currentRouteIsAbout.value = false)
  },
  { immediate: true }
)
</script>

<template>
  <nav class="navigation-mobile">
    <RouterLink to="/" class="router-link">
      <img v-if="!currentRouteIsAbout" :src="HomeActive" alt="Active Home Icon" />
      <img v-if="currentRouteIsAbout" :src="Home" alt="Home Icon" />
    </RouterLink>
    <RouterLink to="/about" class="router-link">
      <img v-if="currentRouteIsAbout" :src="InfoActive" alt="Active Info Icon" />
      <img v-if="!currentRouteIsAbout" :src="Info" alt="Info Icon" />
    </RouterLink>
  </nav>
</template>

<style>
.navigation-mobile {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: var(--element-background-2);
  z-index: 9999;
}

.router-link img {
  width: 2rem;
}
</style>
