<script setup>
import HousesOverview from '../components/HousesOverview.vue'
import SearchBar from '../components/SearchBar.vue'
import CreateNewHouse from '../components/CreateNewHouse.vue'
import SortHouses from '../components/SortHouses.vue'
import EmptySearch from '../components/EmptySearch.vue'

import { useHouseStore } from '../stores/HousesStore'

const houseStore = useHouseStore()
houseStore.fetchHouses()
</script>

<template>
  <div>
    <section class="section-overview-header">
      <div class="overview-header">
        <h1 class="header-houses">Houses</h1>
        <CreateNewHouse />
      </div>
      <div class="overview-header overview-search-sort">
        <SearchBar />
        <SortHouses />
      </div>
    </section>
    <section
      class="section-overview-main"
      v-if="houseStore.filteredData.length == 0 && houseStore.isSearched === true"
    >
      <EmptySearch />
    </section>
    <section class="section-overview-main" v-else-if="houseStore.filteredData.length > 0">
      <HousesOverview
        :housesData="houseStore.filteredData"
        :countFilteredHouses="houseStore.countFilteredHouses"
      />
    </section>
    <section class="section-overview-main" v-else>
      <HousesOverview :housesData="houseStore.housesData" />
    </section>
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

.header-houses {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
}

.section-overview-main {
  font-size: 16px;
  width: 1320px;
  margin: 0 auto;
}

@media only screen and (max-width: 1400px) {
  .section-overview-header {
    width: 1000px;
  }

  .section-overview-main {
    width: 1000px;
  }
}

@media only screen and (max-width: 1050px) {
  .section-overview-header {
    width: 800px;
  }

  .section-overview-main {
    width: 800px;
  }
}

@media only screen and (max-width: 850px) {
  .section-overview-header {
    width: 500px;
  }

  .section-overview-main {
    width: 500px;
  }
  .overview-search-sort {
    flex-direction: column;
  }
}

@media (min-width: 376px) and (max-width: 550px) {
  .section-overview-header {
    width: 95%;
  }

  .section-overview-main {
    width: 95%;
  }

  .overview-header {
    flex-direction: column;
  }

  .header-houses {
    margin-bottom: 20px;
  }
}

@media only screen and (max-width: 375px) {
  .header-houses {
    font-size: 18px;
  }
  .section-overview-header {
    width: 340px;
  }

  .section-overview-main {
    font-size: 12px;
    width: 340px;
    margin-bottom: 12vh;
  }

  .overview-header {
    flex-direction: column;
    position: relative;
  }
}
</style>
