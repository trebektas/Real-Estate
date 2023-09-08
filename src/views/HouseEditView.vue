<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <h1>House Edit Page Id: {{ route.params.id }}</h1>
</template>

<style></style>
