export interface DragItem {
  id: string
  type: string
  originalPosition?: number
  sourceContainer: 'carousel' | 'storage'
}

export interface DragState {
  isDragging: boolean
  draggedItem: DragItem | null
  draggedFromCarousel: boolean
}

export type DragResult = 'success' | 'cancelled' | 'invalid'