---
layout: home
---

{{ data }}

<script setup lang="ts">
import { useData } from 'vitepress'
import { data } from './posts.data'

const { theme } = useData()
</script>
