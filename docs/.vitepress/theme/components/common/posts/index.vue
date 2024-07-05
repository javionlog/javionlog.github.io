<template>
  <div class="grid grid-cols-1 gap-4">
    <a
      v-for="ps in posts"
      :key="ps.url"
      :href="ps.url"
      class="grid gap-3 p-4 rounded cursor-pointer shadow hover:shadow-lg dark:shadow-[--vp-c-default-1] dark:hover:shadow-[--vp-c-default-1]"
    >
      <div class="text-lg font-bold">{{ ps.frontmatter.title }}</div>
      <div class="line-clamp-2 text-sm text-[--vp-c-text-2]">
        {{ ps.frontmatter.description }}
      </div>
      <div class="flex gap-1 text-xs text-[--vp-c-text-3]">
        <span>{{ ps.author }}</span>
        <span>|</span>
        <span>{{ ps.lastUpdated }}</span>
      </div>
    </a>
  </div>
  <Pagination
    v-model:current="currentPage"
    :total="posts.length"
    :page-size="1"
    class="mt-6"
    @change="handlePage"
  />
</template>

<script setup lang="ts">
import { PageInfo } from '../pagination/usePagination'
import { ref } from 'vue'
import { data as posts } from '../../../../utils/posts.data'
import Pagination from '../pagination/index.vue'

defineOptions({
  name: 'Posts'
})

const currentPage = ref(1)
const handlePage = (pageInfo: PageInfo) => {
  console.log('🚀 ~ handlePage ~ pageInfo:', pageInfo)
}
</script>
