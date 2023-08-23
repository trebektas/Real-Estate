<script setup>
import { RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue'
import HeaderItemMobile from './components/HeaderItemMobile.vue'
</script>

<template>
  <HeaderItem v-if="!mobileView" />
  <HeaderItemMobile v-else />
  <main><RouterView /></main>
</template>

<script>
export default {
  data: () => {
    return {
      mobileView: false
    }
  },

  mounted() {
    window.addEventListener('resize', this.checkMobile)
  },
  unmounted() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.mobileView = screen.width <= 375 ? true : false
    }
  },

  created() {
    this.checkMobile()
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
