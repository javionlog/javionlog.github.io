<template>
  <div v-if="frontmatter.injectDocBefore" class="vp-doc">
    <h1>
      {{ frontmatter.title }}
      <a
        class="header-anchor"
        href="#frontmatter-title"
        :aria-label="`Permalink to ${frontmatter.title}`"
        >​</a
      >
    </h1>
    <div class="mt-2 flex gap-4 text-sm text-[var(--vp-c-text-3)]">
      <div class="flex items-center gap-1">
        <VpiUser />
        <div>{{ getMetaAuthor(site.head) }}</div>
      </div>
      <div class="flex items-center gap-1">
        <VpiClock />
        <div>{{ parseTime(page.lastUpdated) }}</div>
      </div>
      <div v-if="frontmatter.tags?.length" class="flex items-center gap-1">
        <VpiBookmark />
        <LinkTag v-for="tag in frontmatter.tags ?? []" :key="tag" :content="tag" size="14px" />
      </div>
    </div>
    <div
      v-if="frontmatter.description"
      class="mt-2 px-3 py-2 border border-dashed border-[var(--vp-c-border)] rounded-sm text-sm text-[var(--vp-c-text-2)]"
    >
      {{ frontmatter.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import LinkTag from '../../common/link-tag/index.vue'
import { parseTime, getMetaAuthor } from '../../../../utils/index'

const { site, frontmatter, page } = useData()
defineOptions({
  name: 'DocBefore'
})
</script>
