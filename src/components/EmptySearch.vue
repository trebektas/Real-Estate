<script setup>
import emptyHousesIcon from '../assets/images/img_empty_houses@3x.png'
</script>

<template>
  <section class="section-overview">
    <div class="container-empty-search">
      <img :src="emptyHousesIcon" class="search-not-found" />
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </section>
</template>

<style>
.search-not-found {
  width: 400px;
  margin: 50px 0;
}

.container-empty-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin-top: 50px;
  color: var(--text-secondary);
}

@media only screen and (max-width: 550px) {
  .search-not-found {
    width: 300px;
  }
}

@media only screen and (max-width: 375px) {
  .search-not-found {
    width: 200px;
  }
  .container-empty-search {
    font-size: 14px;
  }
}
</style>
