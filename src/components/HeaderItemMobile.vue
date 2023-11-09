<script setup>
import HomeActive from '../assets/icons/ic_mobile_navigarion_home_active@3x.png'
import Home from '../assets/icons/ic_mobile_navigarion_home@3x.png'
import InfoActive from '../assets/icons/ic_mobile_navigarion_info_active@3x.png'
import Info from '../assets/icons/ic_mobile_navigarion_info@3x.png'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = ref('home')

const navRoutes = [
  {
    path: '/',
    name: 'home',
    title: 'Houses',
    activeIcon: HomeActive,
    icon: Home,
    activeAlt: 'Active Home Icon',
    alt: 'Home Icon'
  },
  {
    path: '/about',
    name: 'about',
    title: 'About',
    activeIcon: InfoActive,
    icon: Info,
    activeAlt: 'Active About Icon',
    alt: 'About Icon'
  }
]

// Update currentRoute ref based on navRoutes variable when route name changes
watch(
  () => route.name,
  () => {
    const routeExists = navRoutes.find((object) => {
      return object.name === route.name ? true : false
    })

    if (routeExists) {
      navRoutes.forEach((navRoute) => {
        if (navRoute.name === route.name) {
          currentRoute.value = route.name
        }
      })
    } else {
      currentRoute.value = 'home'
    }
  },
  { immediate: true }
)
</script>

<template>
  <nav class="navigation-mobile mobile-content">
    <RouterLink
      v-for="(route, index) in navRoutes"
      :key="index"
      :to="route.path"
      class="router-link"
    >
      <img v-if="currentRoute === route.name" :src="route.activeIcon" :alt="route.activeAlt" />
      <img v-else :src="route.icon" :alt="route.alt" />
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
