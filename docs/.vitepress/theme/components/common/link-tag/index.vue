<template>
  <div class="link-tag" @click.stop="handleGo">
    <div>{{ content }}</div>
    <div class="delimiter"></div>
  </div>
</template>

<script setup lang="ts">
import { useBrowserLocation, useUrlSearchParams } from '@vueuse/core'
import { useRouter } from 'vitepress'

import { getUrlSearchString } from '../../../../utils/index'

type Props = {
  content: string
}

defineOptions({
  name: 'LinkTag'
})

const props = defineProps<Props>()

const location = useBrowserLocation()
const searchParams = useUrlSearchParams<{ page?: number; tag?: string }>()
const router = useRouter()

const handleGo = () => {
  searchParams.page = 1
  searchParams.tag = props.content
  const searchString = getUrlSearchString(searchParams)
  if (location.value.origin && location.value.pathname) {
    const toPath = `${location.value.origin}${location.value.pathname}?${searchString}`
    router.go(toPath)
  }
}
</script>

<style lang="scss" scoped>
.link-tag {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--vp-c-text-3);

  &:hover {
    color: var(--vp-c-brand-1);
    text-decoration: underline dotted;
    cursor: pointer;
  }

  .delimiter {
    width: 0.25rem;
    height: 0.25rem;
    margin: 0 0.25rem;
    background-color: var(--vp-c-text-3);
    border-radius: 50%;
  }

  &:last-child {
    .delimiter {
      display: none;
    }
  }
}
</style>
