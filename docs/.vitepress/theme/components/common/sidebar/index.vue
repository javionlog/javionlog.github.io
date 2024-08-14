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
import { urlSearchParams } from '../../../../composable/useUrlSearchParams'
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

const router = useRouter()
const tagThemes = ['default', 'brand', 'success', 'warning', 'danger']
const getTagTheme = computed(
  () => (index: number) => tagThemes[index % tagThemes.length] as ThemeColor
)
const getTagVariant = computed(
  () => (tag: string) =>
    decodeURIComponent(urlSearchParams.value.tag ?? '') === tag ? 'base' : 'outline'
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

const tags = getTags()

const handleGo = (tagInfo: TagInfo) => {
  urlSearchParams.value.page = '1'
  if (tagInfo.variant === 'base') {
    Reflect.deleteProperty(urlSearchParams.value, 'tag')
  } else {
    urlSearchParams.value.tag = tagInfo.content
  }
  const searchString = getUrlSearchString(urlSearchParams.value)
  const { location } = globalThis
  if (location.origin && location.pathname) {
    const toPath = `${location.origin}${location.pathname}?${searchString}`
    router.go(toPath)
  }
}
</script>
