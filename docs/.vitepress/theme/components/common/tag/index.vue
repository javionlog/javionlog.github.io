<template>
  <div
    :class="`flex items-center px-2 h-default rounded-sm text-xs bg-${props.theme} ${props.theme === 'default' ? 'text-[var(--vp-c-text-1)]' : 'text-white'}`"
  >
    <span>
      <slot>{{ props.content }}</slot>
    </span>
    <VpiClose
      v-if="props.closable"
      :class="`ml-2 hover:cursor-pointer ${props.theme === 'default' ? 'text-placeholder-1 hover:text-hover-1' : 'text-placeholder-2 hover:text-hover-2'}`"
      @click="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import type { Props, Emit } from './useTag'
import { useTag } from './useTag'

defineOptions({
  name: 'Tag'
})

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  closable: true
})

const emit = defineEmits<Emit>()

const { handleClose } = useTag(props, emit)
</script>
