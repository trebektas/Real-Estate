<script setup>
import plusWhiteIcon from '../assets/icons/ic_plus_white@3x.png'
import plusGreyIcon from '../assets/icons/ic_plus_grey@3x.png'

import { useMobileStore } from '../stores/MobileStore'
const mobileStore = useMobileStore()
</script>

<template>
  <button class="button-create-new" @click="$router.push({ name: 'createNewListing' })">
    <span class="plus-icon-container"
      ><img :src="mobileStore.mobileView ? plusGreyIcon : plusWhiteIcon" class="plus-icon" /></span
    ><span v-if="!mobileStore.mobileView" class="create-button-text">CREATE NEW</span>
  </button>
</template>

<style>
.button-create-new {
  padding: 10px;
  background-color: var(--element-primary);
  border: none;
  border-radius: 10px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.plus-icon-container {
  display: flex;
}

.plus-icon {
  height: 20px;
  margin-right: 20px;
}

.create-button-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--element-background-2);
}

@media only screen and (max-width: 375px) {
  .button-create-new {
    padding: 0;
    background-color: var(--element-background-1);
    width: auto;
  }

  .plus-icon {
    margin-right: 0;
    cursor: pointer;
  }

  .button-create-new {
    position: absolute;
    right: 0;
  }
}
</style>
