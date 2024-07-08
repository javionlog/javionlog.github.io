<template>
  <div :class="tagClass">
    <span>
      <slot>{{ props.content }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './useTag'
import { useTag } from './useTag'

defineOptions({
  name: 'Tag'
})

const props = withDefaults(defineProps<Props>(), {
  type: 'defult',
  closable: false
})

const { tagClass } = useTag(props)
</script>
