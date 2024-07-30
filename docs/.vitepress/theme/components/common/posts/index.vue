<template>
  <div>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="ps in pageList"
        :key="ps.url"
        class="grid cursor-pointer gap-3 rounded p-4 shadow dark:shadow-placeholder-1 hover:shadow-lg dark:hover:shadow-placeholder-1"
        @click="handleGo(ps.url)"
      >
        <div>
          <div class="text-lg font-bold">{{ ps.frontmatter.title }}</div>
          <div v-if="ps.frontmatter.tags?.length" class="flex gap-1 items-center">
            <VpiBookmark class="text-sm text-[var(--vp-c-text-3)]" />
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
      :total="postList.length"
      :page-size="pageSize"
      class="mt-6"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'
import { computed, ref, onMounted } from 'vue'

import { getUrlSearchObject, getUrlSearchString } from '../../../../utils/index'
import { urlSearchParams } from '../../../../composable/useUrlSearchParams'
import { data as posts } from '../../../../utils/posts.data'
import LinkTag from '../link-tag/index.vue'
import Pagination from '../pagination/index.vue'

defineOptions({
  name: 'Posts'
})

const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(2)
const postList = computed(() => {
  const result = posts.filter(item => {
    if (typeof urlSearchParams.value.tag === 'string' && urlSearchParams.value.tag.trim().length) {
      const tags = Array.isArray(item.frontmatter.tags) ? item.frontmatter.tags : []
      return tags.includes(urlSearchParams.value.tag)
    }
    return true
  })
  return result
})
const pageList = computed(() => {
  return postList.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})

const handleGo = (url: string) => {
  router.go(url)
}

const handlePageChange = () => {
  urlSearchParams.value.page = currentPage.value
  const searchString = getUrlSearchString(urlSearchParams.value)
  const { location } = globalThis
  if (location.origin && location.pathname) {
    const toPath = `${location.origin}${location.pathname}?${searchString}`
    router.go(toPath)
  }
}

const updateCurrentPage = () => {
  urlSearchParams.value = getUrlSearchObject()
  const page = Number(urlSearchParams.value.page)
  if (page > 0) {
    currentPage.value = page
  } else {
    currentPage.value = 1
  }
}

router.onAfterRouteChanged = () => {
  updateCurrentPage()
}

onMounted(() => {
  updateCurrentPage()
})
</script>
