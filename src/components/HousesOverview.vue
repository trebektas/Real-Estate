<script setup>
import bathIcon from '../assets/house-card/ic_bath@3x.png'
import bedIcon from '../assets/house-card/ic_bed@3x.png'
import sizeIcon from '../assets/house-card/ic_size@3x.png'

import { ref } from 'vue'
const houses = ref(null)
async function getHouses() {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'xD7bh1ZoA3mRlwrv8dYaNgXGLuKe_4JP'
      }
    }
    const response = await fetch('https://api.intern.d-tt.nl/api/houses', config)
    houses.value = await response.json()
    console.log(houses)
  } catch (error) {
    console.log('Error occurred:', error)
  }
}

getHouses()

function formatPrice(price) {
  return new Intl.NumberFormat('en-DE').format(price)
}
</script>

<template>
  <section>
    <ul class="houses-list">
      <li v-for="house in houses" :key="house.id" class="house-card">
        <div class="container-house">
          <div class="house-image"><img :src="house.image" :alt="house.id" /></div>
          <div class="container-information">
            <div class="house-location info">
              {{ house.location.street }} {{ house.location.houseNumber }}
            </div>
            <div class="price-text info">€ {{ formatPrice(house.price) }}</div>
            <div class="zip-code info">{{ house.location.zip }} {{ house.location.city }}</div>
            <div class="rooms-size">
              <span class="icons"><img :src="bedIcon" alt="Bed Icon" /></span
              ><span class="values">{{ house.rooms.bedrooms }}</span>
              <span class="icons"><img :src="bathIcon" alt="Bath Icon" /></span>
              <span class="values">{{ house.rooms.bathrooms }}</span>
              <span class="icons"><img :src="sizeIcon" alt="Size Icon" /></span>
              <span class="values">{{ house.size }} m2</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  font-size: 16px;
}
.container-house {
  display: flex;
  align-items: center;
  margin: 0 auto 30px;
  padding: 20px;
  background-color: var(--element-background-2);
  width: 1320px;
  border-radius: 7px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
}

.house-image img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
  object-fit: cover;
}

span img {
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

@media only screen and (max-width: 375px) {
  section {
    font-size: 12px;
  }
  .container-house {
    width: 340px;
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
