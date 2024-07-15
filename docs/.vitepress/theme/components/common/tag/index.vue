<template>
  <div
    :class="`
      flex
      items-center
      px-2
      h-default
      rounded-sm
      text-xs
      ${
        variant === 'base'
          ? `bg-${theme}`
          : `border border-solid ${
              theme === 'default' ? 'border-[var(--vp-c-text-1)]' : `border-${theme}`
            }`
      }
      ${
        variant === 'base'
          ? theme === 'default'
            ? 'text-[var(--vp-c-text-1)]'
            : 'text-white'
          : theme === 'default'
            ? 'text-[var(--vp-c-text-1)]'
            : `text-${theme}`
      }
    `"
    @click="handleCheck"
  >
    <span>
      <slot>{{ content }}</slot>
    </span>
    <VpiClose
      v-if="closable"
      :class="`ml-2 hover:cursor-pointer ${theme === 'default' ? 'text-placeholder-1 hover:text-hover-1' : 'text-placeholder-2 hover:text-hover-2'}`"
      @click="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { Emit, Props, useTag } from './useTag'

defineOptions({
  name: 'Tag'
})

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  closable: false,
  variant: 'outline'
})
const emit = defineEmits<Emit>()
const { handleClose, handleCheck } = useTag(props, emit)
</script>
