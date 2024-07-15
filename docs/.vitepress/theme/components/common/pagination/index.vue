<template>
  <div v-if="totalPage > 1" class="flex justify-center text-xs">
    <div class="order-1 flex gap-2">
      <TurnButton :current="innerCurrent" :total-page="totalPage" type="prev" @go-page="goPage" />
      <template v-if="prevEllipsisVisible">
        <PageButton :page="1" :current="innerCurrent" @go-page="goPage" />
        <div class="flex items-center"><VpiEllipsis /></div>
      </template>
      <PageButton
        v-for="num in flodPages"
        :key="num"
        :page="num"
        :current="innerCurrent"
        @go-page="goPage"
      />
      <template v-if="nextEllipsisVisible">
        <div class="flex items-center"><VpiEllipsis /></div>
        <PageButton :page="totalPage" :current="innerCurrent" @go-page="goPage" />
      </template>
      <TurnButton :current="innerCurrent" :total-page="totalPage" type="next" @go-page="goPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageButton from './PageButton.vue'
import TurnButton from './TurnButton.vue'
import { Emit, Props, usePagination } from './usePagination'

defineOptions({
  name: 'Pagination'
})

const innerCurrent = defineModel<number>('current', { required: true })

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
    validator(value: number, _props: Props) {
      const min = 7
      const offset = 4
      return value > min && _props.maxFlodPage < value - offset
    }
  },
  maxFlodPage: {
    type: Number,
    default: 5,
    validator(value: number, _props: Props) {
      const min = 2
      const offset = 4
      return value % 2 === 1 && value > min && value < _props.maxPage - offset
    }
  }
})

const emit = defineEmits<Emit>()

const { totalPage, flodPages, prevEllipsisVisible, nextEllipsisVisible, goPage } = usePagination(
  props,
  innerCurrent,
  emit
)
</script>
