<script setup lang="ts">
import {RouterView } from 'vue-router'
import navBar from '@/components/navBar.vue'
import foot from '@/components/foot.vue'
</script>

<template>
  <header>
    <navBar />
  </header>

  <body>
    <RouterView />
  </body>

  <footer>
    <foot />
  </footer>

</template>

<style scoped>

</style>
