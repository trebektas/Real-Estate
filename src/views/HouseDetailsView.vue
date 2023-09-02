<script setup>
import backIcon from '../assets/icons/ic_back_grey@3x.png'
import editIcon from '../assets/icons/ic_edit@3x.png'
import deleteIcon from '../assets/icons/ic_delete@3x.png'
import locationIcon from '../assets/icons/ic_location@3x.png'
import priceIcon from '../assets/icons/ic_price@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import constructionIcon from '../assets/icons/ic_construction_date@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import bathIcon from '../assets/icons/ic_bath@3x.png'
import garageIcon from '../assets/icons/ic_garage@3x.png'

import HouseCard from '../components/HouseCard.vue'

import { useRoute } from 'vue-router'
import { useHouseStore } from '../stores/HousesStore'
import { ref, watch } from 'vue'

const route = useRoute()
const houseStore = useHouseStore()
const houseDetails = ref([])

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': 'xD7bh1ZoA3mRlwrv8dYaNgXGLuKe_4JP'
  }
}

function fetchHouseDetails(id) {
  fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, config)
    .then((response) => response.json())
    .then((data) => (houseDetails.value = data))
    .catch((error) => console.log('Error occurred:', error))
    .finally(houseStore.recommendedHouses(Number(id)))
}

fetchHouseDetails(route.params.id)

function formatPrice(price) {
  return new Intl.NumberFormat('en-DE').format(price)
}

watch(
  () => route.params.id,

  () => {
    fetchHouseDetails(route.params.id)
  }
)
</script>

<template>
  <div class="container-main">
    <div class="back-to-overview">
      <span @click="$router.push({ name: 'home' })" class="back-icon"><img :src="backIcon" /></span>
      <span class="backButtonText">Back to overview</span>
    </div>
    <div class="container-house-details">
      <div v-if="houseDetails" class="house-details">
        <div v-for="house in houseDetails" :key="house.id" class="house-details-wrapper">
          <div class="house-details-image"><img :src="house.image" :alt="house.id" /></div>
          <div class="house-details-section">
            <div class="container-house-address">
              <div class="house-address">
                {{ house.location.street }}
                {{ house.location.houseNumber }}
              </div>
              <div v-if="house.madeByMe" class="edit-delete-tab">
                <span><img :src="editIcon" alt="Edit Icon" /></span
                ><span><img :src="deleteIcon" alt="Delete Icon" /></span>
              </div>
            </div>

            <div class="house-details-location">
              <span><img :src="locationIcon" alt="Location Icon" /></span>{{ house.location.zip }}
              {{ house.location.city }}
            </div>
            <div class="house-details-info">
              <div>
                <span><img :src="priceIcon" alt="Price Icon" class="house-details-icons" /></span
                ><span class="details-info">{{ formatPrice(house.price) }}</span>
                <span><img :src="sizeIcon" alt="Size Icon" class="house-details-icons" /></span>
                <span class="details-info">{{ house.size }} m2</span>
                <span
                  ><img :src="constructionIcon" alt="Construction Icon" class="house-details-icons"
                /></span>
                <span class="details-info">Built in {{ house.constructionYear }}</span>
              </div>
              <div>
                <span><img :src="bedIcon" alt="Bed Icon" class="house-details-icons" /></span
                ><span class="details-info">{{ house.rooms.bedrooms }}</span>
                <span><img :src="bathIcon" alt="Bath Icon" class="house-details-icons" /></span>
                <span class="details-info">{{ house.rooms.bathrooms }}</span>
                <span><img :src="garageIcon" alt="Garage Icon" class="house-details-icons" /></span>
                <span class="details-info">{{ house.hasGarage ? 'Yes' : 'No' }}</span>
              </div>
            </div>

            <div class="house-description">{{ house.description }}</div>
          </div>
        </div>
      </div>
      <div class="recommended-houses" v-if="houseStore.recommendedData.length > 0">
        <h2>Recommended for you</h2>
        <div v-for="house in houseStore.recommendedData" :key="house.id" class="recommended-card">
          <HouseCard :house="house" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container-main {
  width: 1320px;
  margin: 0 auto;
}

.back-to-overview {
  margin: 30px 0;
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

.container-house-details {
  display: flex;
  justify-content: space-between;
}

.house-details {
  width: 800px;
  background-color: var(--element-background-2);
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--element-secondary);
}

.house-details-image {
  margin-bottom: 20px;
}

.house-details-image img {
  width: 800px;
}

.house-details-section {
  margin: 20px;
}

.container-house-address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.house-address {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--text-primary);
}

.edit-delete-tab span {
  margin-left: 20px;
}

.edit-delete-tab img {
  width: 20px;
}

.house-details-location {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.house-details-location img {
  width: 20px;
  margin-right: 10px;
}

.house-details-info div {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.house-details-info img {
  width: 20px;
}

.house-details-icons {
  margin-right: 10px;
  display: flex;
}

.details-info {
  margin-right: 25px;
}

.house-description {
  padding: 20px 0;
}

.recommended-houses h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 20px;
}

.recommended-card a {
  text-decoration: none;
}

@media only screen and (max-width: 375px) {
  .container-house-details {
    flex-direction: column;
  }
  .container-main {
    width: auto;
  }

  .house-details {
    width: auto;
  }

  .house-details-image img {
    width: 375px;
  }

  .backButtonText {
    display: none;
  }

  .back-to-overview {
    position: absolute;
    margin: 30px 0 0 20px;
  }

  .house-details-image {
    margin: 0;
  }

  .house-details-section {
    margin: 0;
    padding: 20px;
    border-radius: 25px 25px 0 0;
    background-color: var(--element-background-2);
    position: relative;
    top: -30px;
  }

  .house-description {
    padding: 20px 0 0;
  }

  .recommended-houses {
    width: 340px;
    margin: 0 auto;
  }

  .recommended-houses h2 {
    margin: 20px 0 15px;
  }
}
</style>