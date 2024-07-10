<template>
  <div :class="tagClass">
    <span>
      <slot>{{ props.content }}</slot>
    </span>
    <VpiClose v-if="props.closable" :class="closeBtnClass" @click="handleClose" />
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
  closable: false
})

const emit = defineEmits<Emit>()

const { tagClass, closeBtnClass, handleClose } = useTag(props, emit)
</script>
