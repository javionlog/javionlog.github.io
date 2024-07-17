<template>
  <div class="link-tag" @click.stop="handleGo">
    <div>{{ content }}</div>
    <div class="delimiter"></div>
  </div>
</template>

<script setup lang="ts">
import { urlSearchParams } from '../../../../composable/useUrlSearchParams'
import { useRouter } from 'vitepress'

import { getUrlSearchString } from '../../../../utils/index'

type Props = {
  content: string
}

defineOptions({
  name: 'LinkTag'
})

const props = defineProps<Props>()

const router = useRouter()

const handleGo = () => {
  urlSearchParams.value.page = 1
  urlSearchParams.value.tag = props.content
  const searchString = getUrlSearchString(urlSearchParams.value)
  const { location } = globalThis
  if (location.origin && location.pathname) {
    const toPath = `${location.origin}${location.pathname}?${searchString}`
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
