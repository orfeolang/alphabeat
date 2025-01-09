<script setup lang="ts">
  import Footer from './components/Footer.vue'
  import Header from './components/Header.vue'
  import Soundexplorer from './components/Soundexplorer.vue'
  import Soundlibrary from './components/Soundlibrary.vue'
</script>

<template>
  <Header />
  <main>
    <Soundlibrary />
    <Soundexplorer />
  </main>
  <Footer />
</template>

<style scoped>
  main {
    margin: 20px auto;
    padding: 20px;
  }
</style>
