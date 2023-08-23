<script setup>
import clearIcon from '../assets/search-bar/ic_clear@3x.png'
</script>

<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <input type="text" placeholder="Search for a house" v-model="inputValue" />
    <img class="clear-icon" v-if="inputValue" :src="clearIcon" @click="clearInput" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    clearInput() {
      this.inputValue = ''
    },
    submitSearch() {
      console.log(`Searched: ${this.inputValue}`)
    }
  }
}
</script>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  margin: 20px 0;
  align-items: center;
}

input {
  width: 400px;
  padding: 10px 20px 10px 50px;
  background: var(--element-tertiary-1) url('../assets/search-bar/ic_search@3x.png') no-repeat 20px
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
