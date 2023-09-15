<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import Logo from '../assets/logo.png'

const route = useRoute()
const currentRouteIsAbout = ref(false)

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
  <header>
    <div class="wrapper">
      <img :src="Logo" alt="DTT Logo" />
      <nav class="navigation">
        <RouterLink to="/" :class="currentRouteIsAbout ? '' : 'header-active'">Houses</RouterLink>
        <RouterLink to="/about" :class="currentRouteIsAbout ? 'header-active' : ''"
          >About</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  position: fixed;
  background-color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
  height: 100px;
  z-index: 999;
}
.wrapper {
  display: flex;
  align-items: center;
  width: 1320px;
  margin: 0 auto;
}

.wrapper img {
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
  .wrapper {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .wrapper {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .wrapper {
    width: 500px;
  }
}

@media only screen and (max-width: 550px) {
  .wrapper {
    width: 350px;
  }

  .wrapper img {
    width: 100px;
  }
}
</style>
