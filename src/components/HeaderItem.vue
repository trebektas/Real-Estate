<script setup>
import { RouterLink } from 'vue-router'
import Logo from '../assets/logo.png'
import { ref } from 'vue'

const isHousesActive = ref(true)

function setHomeActive() {
  isHousesActive.value = true
}

function setAboutActive() {
  isHousesActive.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <img :src="Logo" alt="Company Logo" />
      <nav class="navigation">
        <RouterLink to="/" @click="setHomeActive" :class="isHousesActive ? 'header-active' : null"
          >Houses</RouterLink
        >
        <RouterLink
          to="/about"
          @click="setAboutActive"
          :class="isHousesActive ? null : 'header-active'"
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

.navigation a {
  margin-left: 50px;
  font-size: 18px;
  text-decoration: none;
  color: var(--element-tertiary-2);
  font-weight: 500;
}

a.header-active {
  color: var(--text-primary);
  font-weight: 700;
}
</style>
