<script setup>
import backIcon from '../assets/icons/ic_back_grey@3x.png'
import backWhiteIcon from '../assets/icons/ic_back_white@3x.png'

const props = defineProps({
  currentPath: {
    type: String
  }
})
</script>

<template>
  <span
    @click="props.currentPath === 'houseDetails' ? $router.push({ path: '/' }) : $router.back()"
    class="back-icon"
  >
    <!-- Image for Mobile Content & House Details Page -->
    <img v-if="props.currentPath === 'houseDetails'" :src="backWhiteIcon" class="mobile-content" />
    <!-- Image for Not Mobile Content & House Details Page -->
    <img v-if="props.currentPath === 'houseDetails'" :src="backIcon" class="not-mobile-content" />
    <!-- Image for the other situations -->
    <img v-else :src="backIcon" />
  </span>
  <span class="backButtonText not-mobile-content">Back to overview</span>
</template>

<style>
.back-icon {
  margin-right: 12px;
  display: flex;
  cursor: pointer;
}

.back-icon img {
  width: 20px;
}

@media only screen and (max-width: 375px) {
  .backButtonText {
    display: none;
  }
}
</style>
