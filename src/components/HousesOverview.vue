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

// Sort based on sortedByPrice condition
if (houseStore.sortedByPrice) {
  houseStore.sortByPrice()
} else {
  houseStore.sortBySize()
}
</script>

<template>
  <section>
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

@media only screen and (max-width: 375px) {
  .counter-results {
    font-size: 14px;
  }
}
</style>
