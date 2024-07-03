<template>
  <div class="grid grid-cols-1 gap-4">
    <a
      v-for="ps in posts"
      :key="ps.url"
      :href="ps.url"
      class="grid gap-3 p-4 rounded cursor-pointer shadow hover:shadow-lg dark:shadow-gray-600 dark:hover:shadow-gray-600"
    >
      <div class="text-lg font-bold">{{ ps.frontmatter.title }}</div>
      <div class="line-clamp-2 text-sm text-gray-500 dark:text-gray-300">
        {{ ps.frontmatter.description }}
      </div>
      <div class="flex gap-1 text-xs text-gray-600 dark:text-gray-400">
        <span>{{ ps.author }}</span>
        <span>|</span>
        <span>{{ ps.lastUpdated }}</span>
      </div>
    </a>
  </div>
  <Pagination />
</template>

<script setup lang="ts">
import { data as posts } from '../../../../utils/posts.data'
import Pagination from '../pagination/index.vue'

defineOptions({
  name: 'Posts'
})
</script>
