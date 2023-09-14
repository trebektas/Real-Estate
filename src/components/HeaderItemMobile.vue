<script setup>
import HomeActive from '../assets/icons/ic_mobile_navigarion_home_active@3x.png'
import Home from '../assets/icons/ic_mobile_navigarion_home@3x.png'
import InfoActive from '../assets/icons/ic_mobile_navigarion_info_active@3x.png'
import Info from '../assets/icons/ic_mobile_navigarion_info@3x.png'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const aboutIsActive = ref(false)

watch(
  () => route.name,
  () => {
    if (route.name === 'about') {
      aboutIsActive.value = true
    } else aboutIsActive.value = false
  },
  { immediate: true }
)
</script>

<template>
  <nav class="navigation-mobile">
    <RouterLink to="/" class="router-home">
      <img v-if="!aboutIsActive" :src="HomeActive" alt="Active Home Icon" />
      <img v-if="aboutIsActive" :src="Home" alt="Home Icon" />
    </RouterLink>
    <RouterLink to="/about">
      <img v-if="aboutIsActive" :src="InfoActive" alt="Active Info Icon" />
      <img v-if="!aboutIsActive" :src="Info" alt="Info Icon" />
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
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: var(--element-background-2);
  z-index: 999;
}

a img {
  width: 2rem;
}
</style>
