<template>
  <div
    :class="`
      flex
      items-center
      cursor-pointer
      ${
        btnDisabled
          ? 'cursor-not-allowed text-[var(--vp-button-sponsor-text)]'
          : 'hover:!text-[var(--vp-button-brand-hover-bg)]'
      }
    `"
    @click="handleGo"
  >
    <VpiChevronLeft v-if="type === 'prev'" />
    <VpiChevronRight v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  current: number
  totalPage: number
  type: 'prev' | 'next'
}

defineOptions({
  name: 'TurnButton'
})

const props = defineProps<Props>()

const emit = defineEmits<{
  goPage: [page: number, type?: 'prev' | 'next']
}>()

const addPage = 1
const subtractPage = -1
const btnDisabled = computed(() => {
  if (props.type === 'prev') {
    return props.current === addPage
  }
  return props.current === props.totalPage
})

const handleGo = () => {
  if (!btnDisabled.value) {
    emit('goPage', props.type === 'prev' ? subtractPage : addPage, props.type)
  }
}
</script>
