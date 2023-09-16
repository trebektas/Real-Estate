<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import Logo from '../assets/logo.png'

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
  <header class="navigation-header">
    <div class="navigation-wrapper">
      <img :src="Logo" alt="DTT Logo" />
      <nav class="navigation">
        <RouterLink to="/" :class="currentRouteIsAbout ? '' : 'header-active'">Houses</RouterLink>
        <RouterLink to="/about" :class="currentRouteIsAbout ? 'header-active' : ''">
          About
        </RouterLink>
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
  z-index: 999;
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
