import { useState, useCallback } from 'react'
import type { DragItem, DragResult } from '../types/dragTypes'

interface UseDragBehaviorProps {
  id: string
  type: string
  position?: number
  onDragStart?: (item: DragItem) => void
  onDragEnd?: (result: DragResult, item: DragItem) => void
}

export const useDragBehavior = ({ id, type, position, onDragStart, onDragEnd }: UseDragBehaviorProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragItem, setDragItem] = useState<DragItem | null>(null)

  const handleDragStart = useCallback((e: React.DragEvent) => {
    console.log(`drag start: ${id}`)
    e.stopPropagation()
    
    const item: DragItem = {
      id,
      type,
      originalPosition: position,
      sourceContainer: 'carousel'
    }

    // Set drag data with comprehensive information
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    
    // Update internal state
    setIsDragging(true)
    setDragItem(item)
    
    // Notify parent with full item data
    onDragStart?.(item)
  }, [id, type, position, onDragStart])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    console.log(`drag end: ${dragItem?.id}`)
    e.stopPropagation()
    
    // Default to cancelled - successful drops will have been handled separately
    let result: DragResult = 'cancelled'
    
    // Update state
    setIsDragging(false)
    
    // Notify parent with result and item data
    if (dragItem) {
      onDragEnd?.(result, dragItem)
    }
    
    setDragItem(null)
  }, [dragItem, onDragEnd])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return {
    isDragging,
    dragItem,
    dragHandlers: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragOver: handleDragOver,
      draggable: true
    }
  }
}