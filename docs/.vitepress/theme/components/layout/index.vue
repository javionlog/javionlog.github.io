<template>
  <Layout>
    <template v-for="s in slots" #[s.name]>
      <component :is="s.mod" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import slots from '../slots'

const { Layout } = DefaultTheme
</script>
