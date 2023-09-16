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

<style>
.container-house {
  display: flex;
  align-items: center;
  margin: 0 auto 30px;
  padding: 20px;
  background-color: var(--element-background-2);
  border-radius: 7px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
}

.house-image img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
  object-fit: cover;
}

.rooms-size span img {
  width: 20px;
}

.container-information {
  margin-left: 20px;
  color: var(--text-secondary);
  font-family: 'Open Sans', sans-serif;
}

.house-location {
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.house-location::first-letter {
  text-transform: uppercase;
}

.price-text {
  font-weight: 600;
}

.icons {
  margin-right: 10px;
  display: flex;
}

.rooms-size {
  display: flex;
  align-items: center;
}

.values {
  margin-right: 20px;
}

.info {
  margin-bottom: 13px;
}

@media (min-width: 376px) and (max-width: 550px) {
  .house-image img {
    width: 100px;
    height: 100px;
  }

  .info {
    margin-bottom: 8px;
  }
}

@media only screen and (max-width: 375px) {
  .container-house {
    margin: 0 auto 15px;
    padding: 10px;
  }

  .house-image img {
    width: 100px;
    height: 100px;
  }

  .info {
    margin-bottom: 5px;
  }
}
</style>
