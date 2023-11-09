<script setup>
import plusWhiteIcon from '../assets/icons/ic_plus_white@3x.png'
import plusGreyIcon from '../assets/icons/ic_plus_grey@3x.png'
</script>

<template>
  <button class="button-create-new" @click="$router.push({ name: 'createNewListing' })">
    <span class="plus-icon-container">
      <!-- IT IS MOBILE CONTENT -->
      <img :src="plusGreyIcon" class="plus-icon mobile-content" />
      <!-- IT IS (NOT!) MOBILE CONTENT -->
      <img :src="plusWhiteIcon" class="plus-icon not-mobile-content" />
    </span>
    <!-- IT IS (NOT!) MOBILE CONTENT -->
    <span class="create-button-text not-mobile-content">CREATE NEW</span>
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
