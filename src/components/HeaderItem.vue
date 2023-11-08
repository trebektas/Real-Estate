<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import Logo from '../assets/logo.png'

const route = useRoute()
const currentRoute = ref('home')

const navRoutes = [
  { path: '/', name: 'home', title: 'Houses' },
  { path: '/about', name: 'about', title: 'About' }
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
  <header class="navigation-header">
    <div class="navigation-wrapper">
      <img :src="Logo" alt="DTT Logo" />
      <nav class="navigation">
        <RouterLink
          v-for="(route, index) in navRoutes"
          :key="index"
          :to="route.path"
          :class="currentRoute === route.name ? 'header-active' : ''"
          >{{ route.title }}</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style>
.navigation-header {
  width: 100%;
  display: flex;
  position: fixed;
  background-color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  height: 100px;
  z-index: 9999;
}
.navigation-wrapper {
  display: flex;
  align-items: center;
  width: 1320px;
  margin: 0 auto;
}

.navigation-wrapper img {
  width: 150px;
}

.navigation .router-link-active,
.navigation .header-active {
  color: var(--text-primary);
  font-weight: 700;
}

.navigation a {
  margin-left: 50px;
  font-size: 18px;
  text-decoration: none;
  color: var(--element-tertiary-2);
  font-weight: 500;
}

@media only screen and (max-width: 1400px) {
  .navigation-wrapper {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .navigation-wrapper {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .navigation-wrapper {
    width: 500px;
  }
}

@media only screen and (max-width: 550px) {
  .navigation-wrapper {
    width: 350px;
  }

  .navigation-wrapper img {
    width: 100px;
  }
}
</style>
