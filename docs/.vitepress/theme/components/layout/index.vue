<template>
  <div v-if="page.isNotFound">Not Found</div>
  <Content />
</template>

<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>
