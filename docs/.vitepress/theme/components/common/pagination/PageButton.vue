<template>
  <div
    :class="`
      flex
      items-center
      px-2
      h-default
      cursor-pointer
      rounded-sm
      ${
        current == page
          ? 'border-transparent text-[var(--vp-button-brand-text)] bg-[var(--vp-button-brand-bg)]'
          : 'border border-[var(--vp-c-border)] hover:!text-[var(--vp-button-brand-hover-bg)]'
      }
    `"
    @click="handleGo"
  >
    {{ page }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  current: number
  page: number
}

defineOptions({
  name: 'PageButton'
})

const props = defineProps<Props>()

const emit = defineEmits<{
  goPage: [page: number, type?: 'prev' | 'next']
}>()

const handleGo = () => {
  if (props.page !== props.current) emit('goPage', props.page)
}
</script>
