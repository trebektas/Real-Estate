<script setup>
import { useHouseStore } from '../stores/HousesStore'
import HouseCard from './HouseCard.vue'

const props = defineProps({
  housesData: {
    type: Array,
    required: true
  },
  countFilteredHouses: Number
})

const houseStore = useHouseStore()

if (houseStore.sortedByPrice) {
  houseStore.sortByPrice()
} else {
  houseStore.sortBySize()
}
</script>

<template>
  <section class="section-overview">
    <h2 v-if="props.countFilteredHouses" class="counter-results">
      {{ props.countFilteredHouses }}
      {{ props.countFilteredHouses === 1 ? 'result' : 'results' }} found
    </h2>
    <ul class="houses-list">
      <li v-for="house in props.housesData" :key="house.id" class="house-card">
        <HouseCard :house="house" />
      </li>
    </ul>
  </section>
</template>

<style>
.counter-results {
  margin: 20px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 700;
}
.houses-list {
  margin-top: 10px;
}

.house-card {
  list-style: none;
}

.house-card a {
  text-decoration: none;
}

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

@media only screen and (max-width: 375px) {
  .counter-results {
    font-size: 14px;
  }

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
