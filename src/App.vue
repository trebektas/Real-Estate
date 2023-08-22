<script setup>
import { RouterView } from 'vue-router'
import HeaderItem from './components/headerItem.vue'
import HeaderItemMobile from './components/HeaderItemMobile.vue'
</script>

<template>
  <HeaderItem v-if="!isMobile()" />
  <HeaderItemMobile v-else />
  <RouterView />
</template>

<script>
export default {
  methods: {
    isMobile() {
      if (window.innerWidth <= 900) return true
      else return false
    }
  }
}
</script>

<style scoped></style>
