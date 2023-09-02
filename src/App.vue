<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useMobileStore } from './stores/MobileStore'
import HeaderItem from './components/HeaderItem.vue'
import HeaderItemMobile from './components/HeaderItemMobile.vue'

const mobileStore = useMobileStore()
mobileStore.checkMobile()

onMounted(() => {
  window.addEventListener('resize', mobileStore.checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', mobileStore.checkMobile)
})
</script>

<template>
  <HeaderItem v-if="!mobileStore.mobileView" />
  <HeaderItemMobile v-else />
  <main><RouterView /></main>
</template>

<style scoped>
main {
  width: 100%;
  padding-top: 100px;
}

@media only screen and (max-width: 375px) {
  main {
    /*before it was 10px*/
    padding-top: 0px;
  }
}
</style>
