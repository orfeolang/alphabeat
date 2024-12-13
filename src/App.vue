<script setup lang="ts">
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main><!-- app content --></main>
  <Footer />
</template>

<style scoped>
  main {
    border-top: 1px solid #242429;
    border-bottom: 1px solid #242429;
  }
</style>
