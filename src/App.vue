<script setup>
import { RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue'
import HeaderItemMobile from './components/HeaderItemMobile.vue'
</script>

<template>
  <HeaderItem v-if="!isMobile()" />
  <HeaderItemMobile v-else />
  <main><RouterView /></main>
</template>

<script>
export default {
  methods: {
    isMobile() {
      if (window.innerWidth <= 375) return true
      else return false
    }
  }
}
</script>

<style scoped>
main {
  width: 100%;
  padding-top: 100px;
}

@media only screen and (max-width: 375px) {
  main {
    padding-top: 10px;
  }
}
</style>
