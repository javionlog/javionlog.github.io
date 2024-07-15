import { computed, Ref } from 'vue'

export type Props = {
  total: number
  maxFlodPage: number
  maxPage: number
  pageSize: number
}

export type PageInfo = {
  current: number
  pageSize: number
}

export type Emit = {
  (e: 'change', pageInfo: PageInfo): void
}

export const usePagination = (props: Props, current: Ref<number>, emit: Emit) => {
  const totalPage = computed(() => Math.ceil(props.total / props.pageSize))

  const flodPages = computed(() => {
    const maxFlodPageOffset = (props.maxFlodPage - 1) / 2
    if (totalPage.value < 2) {
      return [1]
    }
    if (totalPage.value <= props.maxPage) {
      return Array.from({ length: totalPage.value }).map((_, k) => k + 1)
    }
    let deltaPages = [1, 2]
    if (totalPage.value > 1 && totalPage.value <= props.maxFlodPage + maxFlodPageOffset) {
      deltaPages = [1, totalPage.value]
    } else if (current.value < props.maxFlodPage) {
      deltaPages = [1, props.maxFlodPage]
    } else if (
      current.value >= props.maxFlodPage &&
      current.value < totalPage.value - props.maxFlodPage + 1
    ) {
      deltaPages = [current.value - maxFlodPageOffset, current.value + maxFlodPageOffset]
    } else {
      deltaPages = [totalPage.value - (props.maxFlodPage - 1), totalPage.value]
    }
    const deltaLength = deltaPages[1] - deltaPages[0] + 1
    return Array.from({ length: deltaLength }).map((_, k) => k + deltaPages[0])
  })

  const prevEllipsisVisible = computed(() => flodPages.value[0] > 1)

  const nextEllipsisVisible = computed(
    () => flodPages.value[flodPages.value.length - 1] < totalPage.value
  )

  const goPage = (page: number, type?: 'prev' | 'next') => {
    const typeList = ['prev', 'next']
    if (type && typeList.includes(type)) {
      current.value += page
    } else {
      current.value = page
    }
    emit('change', { current: current.value, pageSize: props.pageSize })
  }
  return {
    totalPage,
    flodPages,
    prevEllipsisVisible,
    nextEllipsisVisible,
    goPage
  }
}
