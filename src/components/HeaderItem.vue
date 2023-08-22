<script setup>
import { RouterLink } from 'vue-router'
import Logo from '../assets/logo.png'
</script>

<template>
  <header>
    <div class="wrapper">
      <img :src="Logo" alt="Company Logo" />
      <nav class="navigation">
        <RouterLink to="/">Houses</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  position: fixed;
  background-color: var(--element-background-2);
  font-family: 'Montserrat', sans-serif;
}
.wrapper {
  display: flex;
  align-items: center;
  width: 1320px;
  margin: 20px auto;
}

.wrapper img {
  width: 150px;
}

.navigation a {
  margin-left: 50px;
  font-size: 18px;
  text-decoration: none;
  color: var(--element-tertiary-2);

  font-weight: 500;
}

a.router-link-active {
  color: var(--text-primary);
  font-weight: 700;
}
</style>
