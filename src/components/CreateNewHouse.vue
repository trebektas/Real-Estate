<script setup>
import plusWhiteIcon from '../assets/icons/ic_plus_white@3x.png'
</script>

<template>
  <button class="button-create-new" @click="$router.push({ name: 'createNewListing' })">
    <span class="plus-icon-container"><img :src="plusWhiteIcon" class="plusIcon" /></span
    ><span class="create-button-text">CREATE NEW</span>
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

.plusIcon {
  height: 20px;
  margin-right: 20px;
}

.create-button-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--element-background-2);
}
</style>
