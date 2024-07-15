<template>
  <div>
    <div
      class="grid gap-3 rounded p-4 shadow dark:shadow-placeholder-1 hover:shadow-lg dark:hover:shadow-placeholder-1"
    >
      <div class="flex items-center gap-1 text-sm">
        <VpiTag class="transform-rotate-90 text-warning" />
        <span>标签</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="(tag, index) in tags"
          :key="tag"
          :theme="getTagTheme(index)"
          :content="tag"
          :variant="getTagVariant(tag)"
          class="cursor-pointer"
          @check="handleGo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBrowserLocation, useUrlSearchParams } from '@vueuse/core'
import { useRouter } from 'vitepress'
import { computed } from 'vue'

import { ThemeColor } from '../../../../theme/types'
import { getUrlSearchString } from '../../../../utils/index'
import { data as posts } from '../../../../utils/posts.data'
import Tag from '../tag/index.vue'
import { TagInfo } from '../tag/useTag'

defineOptions({
  name: 'Sidebar'
})

const location = useBrowserLocation()
const searchParams = useUrlSearchParams<{ page?: number; tag?: string }>()
const router = useRouter()
const tagThemes = ['default', 'brand', 'success', 'warning', 'danger']
const getTagTheme = computed(
  () => (index: number) => tagThemes[index % tagThemes.length] as ThemeColor
)
const getTags = () => {
  const result: string[] = []
  for (const ps of posts) {
    const { tags = [] } = ps.frontmatter as { tags: string[] }
    if (tags.length > 0) {
      for (const tag of tags) {
        if (!result.includes(tag)) {
          result.push(tag)
        }
      }
    }
  }
  return result
}
const getTagVariant = computed(
  () => (tag: string) => (searchParams.tag === tag ? 'base' : 'outline')
)
const tags = getTags()
const handleGo = (tagInfo: TagInfo) => {
  searchParams.page = 1
  if (tagInfo.variant === 'base') {
    Reflect.deleteProperty(searchParams, 'tag')
  } else {
    searchParams.tag = tagInfo.content
  }
  const searchString = getUrlSearchString(searchParams)
  if (location.value.origin && location.value.pathname) {
    const toPath = `${location.value.origin}${location.value.pathname}?${searchString}`
    router.go(toPath)
  }
}
</script>
