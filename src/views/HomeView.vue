<script setup>
import HousesOverview from '../components/HousesOverview.vue'
import SearchBar from '../components/SearchBar.vue'
import CreateNewHouse from '../components/CreateNewHouse.vue'
import SortHouses from '../components/SortHouses.vue'

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
  } catch (error) {
    console.log('Error occurred:', error)
  }
}

getHouses()
</script>

<template>
  <div class="wrapper">
    <section class="section-overview-header">
      <div class="overview-header">
        <h1>Houses</h1>
        <CreateNewHouse />
      </div>
      <div class="overview-header overview-search-sort"><SearchBar /><SortHouses /></div>
    </section>

    <HousesOverview v-if="houses" :housesData="houses" />
  </div>
</template>

<style scoped>
.section-overview-header {
  width: 1320px;
  margin: 30px auto 0;
}
.overview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media only screen and (max-width: 375px) {
  .section-overview-header {
    width: 340px;
  }

  .overview-search-sort {
    flex-direction: column;
  }
}
</style>
