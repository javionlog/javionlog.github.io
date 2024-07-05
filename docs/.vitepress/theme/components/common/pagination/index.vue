<template>
  <div v-if="totalPage > 1" class="flex justify-center text-xs">
    <ul class="flex order-1 gap-2">
      <li :class="getTurnBtnClass('prev')" @click="goPrev">
        <VpiChevronLeft />
      </li>
      <template v-if="prevEllipsisVisible">
        <li :class="getPageBtnClass(1)" @click="goPage(1)">1</li>
        <li class="flex items-center"><VpiEllipsis /></li>
      </template>
      <li v-for="num in flodPages" :key="num" :class="getPageBtnClass(num)" @click="goPage(num)">
        {{ num }}
      </li>
      <template v-if="nextEllipsisVisible">
        <li class="flex items-center"><VpiEllipsis /></li>
        <li :class="getPageBtnClass(totalPage)" @click="goPage(totalPage)">
          {{ totalPage }}
        </li>
      </template>
      <li :class="getTurnBtnClass('next')" @click="goNext">
        <VpiChevronRight />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from './usePagination'
import type { Props, Emit } from './usePagination'

defineOptions({
  name: 'Pagination'
})

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  maxPage: {
    type: Number,
    default: 10,
    validator(value: number, props: Props) {
      return value > 7 && props.maxFlodPage < value - 4
    }
  },
  maxFlodPage: {
    type: Number,
    default: 5,
    validator(value: number, props: Props) {
      return value % 2 === 1 && value > 2 && value < props.maxPage - 4
    }
  }
})

const innerCurrent = defineModel<number>('current', { required: true })

const emit = defineEmits<Emit>()

const {
  totalPage,
  flodPages,
  prevEllipsisVisible,
  nextEllipsisVisible,
  getPageBtnClass,
  getTurnBtnClass,
  goPage,
  goPrev,
  goNext
} = usePagination(props, innerCurrent, emit)
</script>
