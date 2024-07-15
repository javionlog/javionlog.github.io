<template>
  <div>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="ps in postList"
        :key="ps.url"
        class="grid cursor-pointer gap-3 rounded p-4 shadow dark:shadow-placeholder-1 hover:shadow-lg dark:hover:shadow-placeholder-1"
        @click="handleGo(ps.url)"
      >
        <div>
          <div class="text-lg font-bold">{{ ps.frontmatter.title }}</div>
          <div v-if="ps.frontmatter.tags?.length" class="flex items-center">
            <VpiBookmark class="mr-1 text-[var(--vp-c-text-3)]" />
            <LinkTag v-for="tag in ps.frontmatter.tags ?? []" :key="tag" :content="tag" />
          </div>
        </div>
        <div class="line-clamp-2 text-sm text-[var(--vp-c-text-2)]">
          {{ ps.frontmatter.description }}
        </div>
        <div class="flex gap-1 text-xs text-[var(--vp-c-text-3)]">
          <span>{{ ps.author }}</span>
          <span>|</span>
          <span>{{ ps.lastUpdated }}</span>
        </div>
      </div>
    </div>
    <Pagination
      v-model:current="currentPage"
      :total="finalPosts.length"
      :page-size="pageSize"
      class="mt-6"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useBrowserLocation, useUrlSearchParams } from '@vueuse/core'
import { useRoute, useRouter } from 'vitepress'
import { computed, ref, watch } from 'vue'

import { getUrlSearchString } from '../../../../utils/index'
import { data as posts } from '../../../../utils/posts.data'
import LinkTag from '../link-tag/index.vue'
import Pagination from '../pagination/index.vue'

defineOptions({
  name: 'Posts'
})

const location = useBrowserLocation()
const searchParams = useUrlSearchParams<{ page?: number; tag?: string }>()
const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(2)
const finalPosts = computed(() =>
  posts.filter(item => {
    if (typeof searchParams.tag === 'string' && searchParams.tag.trim().length) {
      const tags = Array.isArray(item.frontmatter.tags) ? item.frontmatter.tags : []
      return tags.includes(searchParams.tag)
    }
    return true
  })
)
const postList = computed(() =>
  finalPosts.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
)

const handleGo = (url: string) => {
  router.go(url)
}

const handlePageChange = () => {
  searchParams.page = currentPage.value
  const searchString = getUrlSearchString(searchParams)
  if (location.value.origin && location.value.pathname) {
    const toPath = `${location.value.origin}${location.value.pathname}?${searchString}`
    router.go(toPath)
  }
}

watch(
  route,
  () => {
    const page = Number(searchParams.page)
    if (page > 0) {
      currentPage.value = page
    }
  },
  {
    immediate: true
  }
)
</script>
