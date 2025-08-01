import { useDragBehavior } from '../hooks/useDragBehavior'
import type { DragItem, DragResult } from '../types/dragTypes'
import './Package.css'

interface PackageProps {
  id: string
  position: number
  type?: 'luggage'
  isHidden?: boolean
  onDragStart?: (item: DragItem) => void
  onDragEnd?: (result: DragResult, item: DragItem) => void
}

const Package = ({ 
  id, 
  position, 
  type = 'luggage', 
  isHidden = false,
  onDragStart, 
  onDragEnd 
}: PackageProps) => {
  const { isDragging, dragHandlers } = useDragBehavior({
    id,
    type,
    position,
    onDragStart,
    onDragEnd
  })

  // Don't render if hidden during drag operation
  if (isHidden) {
    return null
  }

  return (
    <div 
      className={`package package-${type} ${isDragging ? 'dragging' : ''}`}
      style={{ left: `${position}px` }}
      {...dragHandlers}
      role="button"
      aria-label={`Package ${id}, draggable`}
      tabIndex={0}
    >
      <span className="package-label">{id}</span>
    </div>
  )
}

export default Package