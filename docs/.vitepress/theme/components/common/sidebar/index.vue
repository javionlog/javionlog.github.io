<template>
  <div
    class="rounded p-4 shadow hover:shadow-lg dark:shadow-[--vp-c-default-1] dark:hover:shadow-[--vp-c-default-1]"
  >
    <div class="flex flex-wrap gap-2">
      <Tag
        v-for="(tag, index) in tags"
        :theme="tagThemes[index % tagThemes.length]"
        :content="tag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../../../../utils/posts.data'
import Tag from '../tag/index.vue'

defineOptions({
  name: 'Sidebar'
})

const tagThemes = ['default', 'brand', 'success', 'warning', 'danger']

const getTags = () => {
  const result: string[] = []
  for (const ps of posts) {
    const tags = ps.frontmatter.tags
    if (Array.isArray(tags) && tags.length > 0) {
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
</script>
