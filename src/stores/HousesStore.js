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
        this.filteredData = state.housesData.filter((house) => {
          if (
            house.location.street.toLowerCase().includes(searchKey.toLowerCase()) ||
            house.location.houseNumber.toString() === searchKey ||
            house.price.toString() === searchKey ||
            house.location.zip.toLowerCase() === searchKey.toLowerCase() ||
            house.size.toString() === searchKey ||
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
            'X-Api-Key': 'xD7bh1ZoA3mRlwrv8dYaNgXGLuKe_4JP'
          }
        }
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', config)
        const data = await response.json()
        this.housesData = data.sort((a, b) => a.price - b.price)
      } catch (error) {
        console.log('Error occurred:', error)
      }
    },
    sortByPrice() {
      this.housesData = this.housesData.sort((a, b) => a.price - b.price)
      this.sortedByPrice = true
    },

    sortBySize() {
      this.housesData = this.housesData.sort((a, b) => a.size - b.size)
      this.sortedByPrice = false
    }
  }
})
