import { computed } from 'vue'

export type Props = {
  type?: 'defult' | 'brand' | 'tip' | 'warning' | 'danger'
  content?: string
  closable?: boolean
}

export const useTag = (props: Props) => {
  const tagClass = computed(() => {
    const commonClass = ['px-2', 'py-1', 'rounded-sm']
    if (props.type) {
      commonClass.push(`bg-[--vp-c-${props.type}-1]`)
    }
    let diffClass: string[] = []
    return [...commonClass, ...diffClass]
  })

  return { tagClass }
}
