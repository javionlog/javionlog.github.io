<template>
  <div v-for="ps in posts" :key="ps.url">
    <div>{{ ps.frontmatter.title }}</div>
    <div v-html="ps.excerpt" />
    <div>
      <span>{{ ps.author }}</span>
      <span>|</span>
      <span>{{ ps.lastUpdated }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../../../../utils/posts.data'

defineOptions({
  name: 'Posts'
})
</script>
