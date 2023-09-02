import { defineStore } from 'pinia'

export const useMobileStore = defineStore('MobileStore', {
  state: () => {
    return {
      mobileView: false
    }
  },

  //   getters: {},

  actions: {
    checkMobile() {
      this.mobileView = screen.width <= 375 ? true : false
    }
  }
})
