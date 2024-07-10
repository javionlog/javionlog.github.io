<template>
  <div class="home-layout">
    <Posts />
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import Posts from '../posts/index.vue'
import Sidebar from '../sidebar/index.vue'

defineOptions({
  name: 'Home'
})
</script>

<style lang="scss" scoped>
.home-layout {
  display: grid;
  grid-template-columns: 3fr minmax(200px, 1fr);
  grid-gap: 24px;
}
</style>
