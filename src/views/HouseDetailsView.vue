<script setup>
import locationIcon from '../assets/icons/ic_location@3x.png'
import priceIcon from '../assets/icons/ic_price@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import constructionIcon from '../assets/icons/ic_construction_date@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import bathIcon from '../assets/icons/ic_bath@3x.png'
import garageIcon from '../assets/icons/ic_garage@3x.png'

import BackToOverview from '../components/BackToOverview.vue'

import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useMobileStore } from '../stores/MobileStore'
import EditDeleteTab from '../components/EditDeleteTab.vue'
import { apiService } from '../services/apiService'

const route = useRoute()

const mobileStore = useMobileStore()

const houseDetails = ref([])

//get house details data
apiService(`${import.meta.env.VITE_API_URL}/${route.params.id}`, 'GET')
  .then((response) => response.json())
  .then((data) => (houseDetails.value = data))
  .catch((error) => console.log('Error occurred:', error))

function formatPrice(price) {
  return new Intl.NumberFormat('en-DE').format(price)
}
</script>

<template>
  <div class="container-house-details-main">
    <BackToOverview />
    <div class="container-house-details">
      <div v-if="houseDetails" class="house-details">
        <div v-for="house in houseDetails" :key="house.id">
          <!--Edit/Delete tab conditions for mobile >> house.madeByMe && mobileStore.mobileView-->
          <EditDeleteTab v-if="house.madeByMe && mobileStore.mobileView" />
          <div class="house-details-image"><img :src="house.image" :alt="house.id" /></div>
          <div class="house-details-section">
            <div class="container-house-address">
              <div class="house-address">
                {{ house.location.street }}
                {{ house.location.houseNumber }}
              </div>
              <!--Edit/Delete tab conditions for desktop >> house.madeByMe && !mobileStore.mobileView-->
              <EditDeleteTab v-if="house.madeByMe && !mobileStore.mobileView" />
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
    </div>
  </div>
</template>

<style>
.container-house-details-main {
  width: 1320px;
  margin: 0 auto;
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
  height: 550px;
  object-fit: cover;
  object-position: center;
}

.house-details-section {
  position: relative;
  margin: 20px;
}

.container-house-address {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.container-house-address .edit-delete-tab {
  margin: 0;
}

.house-address {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--text-primary);
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

@media only screen and (max-width: 1400px) {
  .container-house-details-main {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .container-house-details-main {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .container-house-details-main {
    width: 500px;
  }

  .house-details {
    width: 500px;
  }

  .house-details-image img {
    width: 500px;
    height: 225px;
  }
}

@media only screen and (max-width: 550px) {
  .container-house-details-main {
    width: 350px;
  }

  .house-details {
    width: 350px;
  }

  .house-details-image img {
    width: 350px;
    height: 200px;
  }
}

@media only screen and (max-width: 375px) {
  .container-house-details {
    flex-direction: column;
  }
  .container-house-details-main {
    width: auto;
  }

  .house-details {
    width: auto;
  }

  .house-details .edit-delete-tab {
    margin-top: 30px;
  }

  .house-details-image img {
    width: 375px;
    height: 200px;
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
}
</style>
