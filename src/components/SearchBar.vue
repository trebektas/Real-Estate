<script setup>
import clearIcon from '../assets/icons/ic_clear@3x.png'
import { ref } from 'vue'
import { useHouseStore } from '../stores/HousesStore'

const searchQuery = ref(null)
const houseStore = useHouseStore()

function clearInput() {
  searchQuery.value = null
  houseStore.filteredData = []
  houseStore.isSearched = false
}

function submitSearch() {
  if (searchQuery.value) {
    houseStore.filteredHouses(searchQuery.value.trim())
    houseStore.isSearched = true
  } else {
    clearInput()
  }
}
</script>

<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <input type="text" placeholder="Search for a house" v-model="searchQuery" />
    <img class="clear-icon" v-if="searchQuery" :src="clearIcon" @click="clearInput" />
  </form>
</template>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  margin: 20px 0;
  align-items: center;
}

input {
  width: 450px;
  padding: 10px 20px 10px 50px;
  background: var(--element-tertiary-1) url('../assets/icons/ic_search@3x.png') no-repeat 20px
    center;
  background-size: 15px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  color: var(--text-secondary);
  font-family: 'Open Sans', sans-serif;
  outline: none;
  font-weight: 400;
}

.clear-icon {
  position: absolute;
  right: 0;
  transform: translate(-50%, 0%);
  width: 20px;
}

.clear-icon:hover {
  cursor: pointer;
}

@media only screen and (max-width: 375px) {
  input {
    width: 340px;
  }
}
</style>
