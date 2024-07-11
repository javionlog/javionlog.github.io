import { computed } from 'vue'

export type Props = {
  theme?: 'default' | 'brand' | 'success' | 'warning' | 'danger'
  content?: string
  closable?: boolean
}

export type Emit = {
  close: [event: MouseEvent]
}

export const useTag = (props: Props, emit: Emit) => {
  const tagClass = computed(() => {
    const commonClass = ['flex', 'items-center', 'px-2', 'h-vp-default', 'rounded-sm', 'text-xs']
    const themeMap = {
      default: 'bg-[--vp-c-default-1] text-[--vp-c-text-1]',
      brand: 'bg-[--vp-c-brand-1] text-[--vp-c-white]',
      success: 'bg-[--vp-c-success-1] text-[--vp-c-white]',
      warning: 'bg-[--vp-c-warning-1] text-[--vp-c-white]',
      danger: 'bg-[--vp-c-danger-1] text-[--vp-c-white]'
    }
    const diffClass = [themeMap[props.theme ?? 'default']]
    return [...commonClass, ...diffClass]
  })

  const closeBtnClass = computed(() => {
    const commonClass = ['ml-2', 'hover:cursor-pointer', 'hover:scale-110']
    commonClass.push(
      props.theme === 'default'
        ? 'text-[--vp-c-placeholder-1] hover:text-[--vp-c-hover-1]'
        : 'text-[--vp-c-placeholder-2] hover:text-[--vp-c-hover-2]'
    )
    return commonClass
  })

  const handleClose = (event: MouseEvent) => {
    emit('close', event)
  }

  return { tagClass, closeBtnClass, handleClose }
}
