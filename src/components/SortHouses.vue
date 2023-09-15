<script setup>
import { useHouseStore } from '../stores/HousesStore'

const houseStore = useHouseStore()
</script>

<template>
  <div class="container-sort-list">
    <ul class="sort-list">
      <li
        class="list-price"
        :class="houseStore.sortedByPrice ? 'active-list' : null"
        @click="houseStore.sortByPrice"
      >
        Price
      </li>
      <li
        class="list-size"
        :class="houseStore.sortedByPrice ? null : 'active-list'"
        @click="houseStore.sortBySize"
      >
        Size
      </li>
    </ul>
  </div>
</template>

<style>
.sort-list {
  display: flex;
}

.sort-list li {
  list-style: none;
  color: var(--element-background-2);
  background-color: var(--element-tertiary-2);
  width: 150px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.list-price {
  border-radius: 5px 0 0 5px;
}

.list-size {
  border-radius: 0 5px 5px 0;
}

li.active-list {
  background-color: var(--element-primary);
}

@media (min-width: 551px) and (max-width: 850px) {
  .container-sort-list {
    margin-bottom: 15px;
  }

  .sort-list li {
    width: 225px;
  }
}

@media (min-width: 376px) and (max-width: 550px) {
  .container-sort-list {
    margin-bottom: 15px;
  }

  .sort-list li {
    width: 150px;
  }
}

@media only screen and (max-width: 375px) {
  .container-sort-list {
    margin-bottom: 15px;
  }

  .sort-list li {
    width: 150px;
  }
}
</style>
