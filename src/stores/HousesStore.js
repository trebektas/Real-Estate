import { defineStore } from 'pinia'

export const useHouseStore = defineStore('HousesStore', {
  state: () => {
    return {
      housesData: [],
      filteredData: [],
      isSearched: false,
      sortedByPrice: true
    }
  },

  getters: {
    countFilteredHouses: (state) => state.filteredData.length,
    filteredHouses(state) {
      return (searchKey) => {
        state.filteredData = state.housesData.filter((house) => {
          if (
            house.location.street.toLowerCase().includes(searchKey.toLowerCase()) ||
            house.location.houseNumber.toString() === searchKey ||
            house.price.toString() === searchKey ||
            house.location.zip.toLowerCase() === searchKey.toLowerCase() ||
            house.size.toString() === searchKey ||
            house.size.toString() + ' m2' === searchKey ||
            house.location.city.toLowerCase().includes(searchKey.toLowerCase())
          ) {
            return house
          }
        })
      }
    }
  },

  actions: {
    async fetchHouses() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': import.meta.env.VITE_API_KEY
          }
        }
        const response = await fetch(import.meta.env.VITE_API_URL, config)
        const data = await response.json()
        this.housesData = data.sort((a, b) => a.price - b.price)
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
