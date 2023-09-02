import { defineStore } from 'pinia'

export const useHouseStore = defineStore('HousesStore', {
  state: () => {
    return {
      housesData: [],
      filteredData: [],
      recommendedData: [],
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
    },
    recommendedHouses(state) {
      return (houseId) => {
        const houseDataById = state.housesData.find((house) => house.id === houseId)
        state.recommendedData = state.housesData
          .filter((house) => {
            if (house.id !== houseId && house.location.city === houseDataById.location.city) {
              return house
            }
          })
          .sort((a, b) => a.id - b.id)
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
