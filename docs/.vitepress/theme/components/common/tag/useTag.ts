export type Props = {
  theme?: 'default' | 'brand' | 'success' | 'warning' | 'danger'
  content?: string
  closable?: boolean
}

export type Emit = {
  (e: 'close', event: MouseEvent): void
}

export const useTag = (_: Props, emit: Emit) => {
  const handleClose = (event: MouseEvent) => {
    emit('close', event)
  }

  return { handleClose }
}
