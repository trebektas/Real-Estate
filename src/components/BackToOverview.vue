<script setup>
import { useRouter } from 'vue-router'
import BackToIcon from './BackToIcon.vue'

const router = useRouter()

const currentPathObject = router.currentRoute.value.name
</script>

<template>
  <!-- currentPathObject === 'houseDetails &&  mobile-content-->
  <div v-if="currentPathObject === 'houseDetails'" class="back-to-overview-mobile mobile-content">
    <BackToIcon :currentPath="currentPathObject" />
  </div>
  <!-- currentPathObject === 'houseDetails &&  not-mobile-content-->
  <div v-if="currentPathObject === 'houseDetails'" class="back-to-overview not-mobile-content">
    <BackToIcon :currentPath="currentPathObject" />
  </div>
  <!-- currentPathObject !== 'houseDetails -->
  <div v-else class="back-to-overview"><BackToIcon :currentPath="currentPathObject" /></div>
</template>

<style>
.back-to-overview {
  padding: 30px 0;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
}

@media only screen and (max-width: 375px) {
  .back-to-overview-mobile {
    position: absolute;
    margin: 30px 0 0 20px;
    padding: 0;
  }

  .back-to-overview {
    position: absolute;
    left: 0;
  }
}
</style>
