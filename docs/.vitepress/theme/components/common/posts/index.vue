<template>
  <div>
    <div class="grid grid-cols-1 gap-4">
      <a
        v-for="ps in postList"
        :key="ps.url"
        :href="ps.url"
        class="grid cursor-pointer gap-3 rounded p-4 shadow hover:shadow-lg dark:shadow-[--vp-c-default-1] dark:hover:shadow-[--vp-c-default-1]"
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
      :page-size="pageSize"
      @change="handlePageChange"
      class="mt-6"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'
import { useBrowserLocation, useUrlSearchParams } from '@vueuse/core'
import { ref, computed, watch } from 'vue'
import { data as posts } from '../../../../utils/posts.data'
import Pagination from '../pagination/index.vue'

defineOptions({
  name: 'Posts'
})

const location = useBrowserLocation()
const searchParams = useUrlSearchParams()
const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(2)
const postList = computed(() => {
  return posts.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})

const handlePageChange = () => {
  const toPath = `${location.value.origin}${router.route.path}?page=${currentPage.value}`
  router.go(toPath)
}

watch(
  route,
  () => {
    const page = Number(searchParams.page)
    if (Number.isNaN(page)) {
      currentPage.value = 1
    } else {
      if (page > 0) {
        currentPage.value = page
      }
    }
  },
  {
    immediate: true
  }
)
</script>
