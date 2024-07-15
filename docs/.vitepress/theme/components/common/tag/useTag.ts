import { ThemeColor } from '../../../../theme/types'

export type Props = {
  theme?: ThemeColor
  content: string
  closable?: boolean
  variant?: 'base' | 'outline'
}

export type TagInfo = Props

export type Emit = {
  (e: 'close' | 'check', tagInfo: Props): void
}

export const useTag = (props: Props, emit: Emit) => {
  const handleClose = () => {
      emit('close', props)
    },
    handleCheck = () => {
      emit('check', props)
    }

  return { handleClose, handleCheck }
}
