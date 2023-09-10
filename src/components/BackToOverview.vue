<script setup>
import backIcon from '../assets/icons/ic_back_grey@3x.png'
import backWhiteIcon from '../assets/icons/ic_back_white@3x.png'

import { useRouter } from 'vue-router'
import { useMobileStore } from '../stores/MobileStore'
const mobileStore = useMobileStore()
const router = useRouter()

const currentPathObject = router.currentRoute.value.name
</script>

<template>
  <div
    :class="
      mobileStore.mobileView && currentPathObject === 'houseDetails'
        ? 'back-to-overview-mobile'
        : 'back-to-overview'
    "
  >
    <span
      @click="currentPathObject === 'houseDetails' ? $router.push({ path: '/' }) : $router.back()"
      class="back-icon"
      ><img
        :src="
          mobileStore.mobileView && currentPathObject === 'houseDetails' ? backWhiteIcon : backIcon
        "
    /></span>
    <span v-if="!mobileStore.mobileView" class="backButtonText">Back to overview</span>
  </div>
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

.back-icon {
  margin-right: 12px;
  display: flex;
  cursor: pointer;
}

.back-icon img {
  width: 20px;
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

  .backButtonText {
    display: none;
  }
}
</style>
