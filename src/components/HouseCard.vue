<script setup>
import { RouterLink } from 'vue-router'
import bathIcon from '../assets/icons/ic_bath@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'

function formatPrice(price) {
  return new Intl.NumberFormat('en-DE').format(price)
}

const props = defineProps({
  house: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="`/houses/${props.house.id}`">
    <div class="container-house">
      <div class="house-image"><img :src="props.house.image" :alt="props.house.id" /></div>
      <div class="container-information">
        <div class="house-location info">
          {{ props.house.location.street }} {{ props.house.location.houseNumber }}
        </div>
        <div class="price-text info">€ {{ formatPrice(props.house.price) }}</div>
        <div class="zip-code info">
          {{ props.house.location.zip }} {{ props.house.location.city }}
        </div>
        <div class="rooms-size">
          <span class="icons"><img :src="bedIcon" alt="Bed Icon" /></span
          ><span class="values">{{ props.house.rooms.bedrooms }}</span>
          <span class="icons"><img :src="bathIcon" alt="Bath Icon" /></span>
          <span class="values">{{ props.house.rooms.bathrooms }}</span>
          <span class="icons"><img :src="sizeIcon" alt="Size Icon" /></span>
          <span class="values">{{ props.house.size }} m2</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style></style>
