<script setup>
import { RouterView } from 'vue-router'

import HeaderItem from './components/HeaderItem.vue'
import HeaderItemMobile from './components/HeaderItemMobile.vue'
</script>

<template>
  <HeaderItem />
  <HeaderItemMobile />
  <main><RouterView /></main>
</template>

<style scoped>
main {
  width: 100%;
  padding-top: 100px;
}

@media only screen and (max-width: 375px) {
  main {
    padding-top: 0px;
  }
}
</style>
