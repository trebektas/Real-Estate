import { defineStore } from 'pinia'
import { apiService } from '../services/apiService'

export const useHouseStore = defineStore('HousesStore', {
  state: () => {
    return {
      housesData: [],
      filteredData: [],
      isSearched: false,
      searchQuery: null,
      sortedByPrice: true
    }
  },

  getters: {
    countFilteredHouses: (state) => state.filteredData.length,
    filteredHouses(state) {
      state.filteredData = state.housesData.filter((house) => {
        if (
          house.location.street.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          house.location.houseNumber.toString() === state.searchQuery ||
          house.price.toString() === state.searchQuery ||
          house.location.zip.toLowerCase() === state.searchQuery.toLowerCase() ||
          house.size.toString() === state.searchQuery ||
          house.size.toString() + ' m2' === state.searchQuery ||
          house.location.city.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) {
          return house
        }
      })
    }
  },

  actions: {
    async fetchHouses() {
      try {
        const response = await apiService(import.meta.env.VITE_API_URL, 'GET')
        const data = await response.json()
        this.housesData = this.sortedByPrice
          ? data.sort((a, b) => a.price - b.price)
          : data.sort((a, b) => a.size - b.size)
      } catch (error) {
        console.log('Error occurred:', error)
      }
    },

    sortByPrice() {
      if (this.filteredData.length > 0) {
        this.filteredData = this.filteredData.sort((a, b) => a.price - b.price)
      } else {
        this.housesData = this.housesData.sort((a, b) => a.price - b.price)
      }

      this.sortedByPrice = true
    },

    sortBySize() {
      if (this.filteredData.length > 0) {
        this.filteredData = this.filteredData.sort((a, b) => a.size - b.size)
      } else {
        this.housesData = this.housesData.sort((a, b) => a.size - b.size)
      }

      this.sortedByPrice = false
    }
  }
})
