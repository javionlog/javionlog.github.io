<template>
  <Layout>
    <template v-for="s in slots" :key="s.mod" #[s.name]>
      <component :is="s.mod" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'

import slots from '../slots'

const { Layout } = DefaultTheme
</script>
