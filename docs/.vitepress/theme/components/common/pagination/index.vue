<template>
  <div>
    <div>
      <a v-for="n in props.total" :key="n">{{ n }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  active: number
  total: number
}

defineOptions({
  name: 'Pagination'
})

const props = withDefaults(defineProps<Props>(), {
  active: 1,
  total: 10
})
</script>
