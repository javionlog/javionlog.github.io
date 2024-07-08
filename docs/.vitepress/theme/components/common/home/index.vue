<template>
  <div>
    <Posts />
    <Tag type="brand" content="前端" />
  </div>
</template>

<script setup lang="ts">
import Posts from '../posts/index.vue'
import Tag from '../tag/index.vue'

defineOptions({
  name: 'Home'
})
</script>
