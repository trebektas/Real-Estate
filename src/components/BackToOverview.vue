<script setup>
import backIcon from '../assets/icons/ic_back_grey@3x.png'
import backWhiteIcon from '../assets/icons/ic_back_white@3x.png'

import { useMobileStore } from '../stores/MobileStore'
const mobileStore = useMobileStore()
</script>

<template>
  <div class="back-to-overview">
    <span @click="$router.push({ name: 'home' })" class="back-icon"
      ><img :src="mobileStore.mobileView ? backWhiteIcon : backIcon"
    /></span>
    <span class="backButtonText">Back to overview</span>
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
  .back-to-overview {
    position: absolute;
    margin: 30px 0 0 20px;
    padding: 0;
  }
  .backButtonText {
    display: none;
  }
}
</style>
