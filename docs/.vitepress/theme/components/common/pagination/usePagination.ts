import type { Ref } from 'vue'
import { computed } from 'vue'

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
  const totalPage = computed(() => {
    return Math.ceil(props.total / props.pageSize)
  })

  const flodPages = computed(() => {
    const maxFlodPageOffset = (props.maxFlodPage - 1) / 2

    if (totalPage.value < 2) {
      return [1]
    }
    if (totalPage.value <= props.maxPage) {
      return Array.from({ length: totalPage.value }).map((_, k) => {
        return k + 1
      })
    }
    let deltaPages = [1, 2]
    if (totalPage.value > 1 && totalPage.value <= props.maxFlodPage + maxFlodPageOffset) {
      deltaPages = [1, totalPage.value]
    } else {
      if (current.value < props.maxFlodPage) {
        deltaPages = [1, props.maxFlodPage]
      } else if (
        current.value >= props.maxFlodPage &&
        current.value < totalPage.value - props.maxFlodPage + 1
      ) {
        deltaPages = [current.value - maxFlodPageOffset, current.value + maxFlodPageOffset]
      } else {
        deltaPages = [totalPage.value - (props.maxFlodPage - 1), totalPage.value]
      }
    }
    const deltaLength = deltaPages[1] - deltaPages[0] + 1
    return Array.from({ length: deltaLength }).map((_, k) => {
      return k + deltaPages[0]
    })
  })

  const prevBtnDisabled = computed(() => {
    return current.value === 1
  })

  const nextBtnDisabled = computed(() => {
    return current.value === totalPage.value
  })

  const prevEllipsisVisible = computed(() => {
    return flodPages.value[0] > 1
  })

  const nextEllipsisVisible = computed(() => {
    return flodPages.value[flodPages.value.length - 1] < totalPage.value
  })

  const getPageBtnClass = computed(() => {
    return (page: number) => {
      const commonClass = ['px-2', 'py-1', 'cursor-pointer', 'rounded-sm']
      let diffClass: string[] = []
      if (current.value === page) {
        diffClass = [
          'border-transparent',
          'text-[--vp-button-brand-text]',
          'bg-[--vp-button-brand-bg]'
        ]
      } else {
        diffClass = ['border', 'border-[--vp-c-border]', 'hover:!text-[--vp-button-brand-hover-bg]']
      }
      return [...commonClass, ...diffClass]
    }
  })

  const getTurnBtnClass = computed(() => {
    return (type: 'prev' | 'next' = 'prev') => {
      const btnDisabled = type === 'prev' ? prevBtnDisabled : nextBtnDisabled
      const commonClass = ['flex', 'items-center', 'cursor-pointer']
      let diffClass: string[] = []
      if (btnDisabled.value) {
        diffClass = ['cursor-not-allowed', 'text-[--vp-button-sponsor-text]']
      } else {
        diffClass = ['hover:!text-[--vp-button-brand-hover-bg]']
      }
      return [...commonClass, ...diffClass]
    }
  })

  const goPage = (page: number) => {
    current.value = page
    emit('change', { current: current.value, pageSize: props.pageSize })
  }

  const goPrev = () => {
    if (!prevBtnDisabled.value) {
      current.value -= 1
      emit('change', { current: current.value, pageSize: props.pageSize })
    }
  }

  const goNext = () => {
    if (!nextBtnDisabled.value) {
      current.value += 1
      emit('change', { current: current.value, pageSize: props.pageSize })
    }
  }

  return {
    totalPage,
    flodPages,
    prevBtnDisabled,
    nextBtnDisabled,
    prevEllipsisVisible,
    nextEllipsisVisible,
    getPageBtnClass,
    getTurnBtnClass,
    goPage,
    goPrev,
    goNext
  }
}
