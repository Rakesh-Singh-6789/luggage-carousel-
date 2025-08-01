import { useState } from 'react'
import './StorageSlot.css'

interface StorageSlotProps {
  isPriority: boolean
  slotIndex: number
  packageId?: string
  onDrop?: (slotIndex: number, packageId: string) => void
}

const StorageSlot = ({ isPriority, slotIndex, packageId, onDrop }: StorageSlotProps) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedPackageId = e.dataTransfer.getData('text/plain')
    setIsDragOver(false)
    
    if (droppedPackageId) {
      console.log(`drop attempt: pkg ${droppedPackageId} -> slot ${slotIndex}`)
      onDrop?.(slotIndex, droppedPackageId)
    }
  }

  return (
    <div 
      className={`storage-slot ${isPriority ? 'priority-slot' : ''} ${isDragOver ? 'drag-over' : ''} ${packageId ? 'occupied' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {packageId && (
        <div className="stored-package">
          <span className="stored-package-label">{packageId}</span>
        </div>
      )}
    </div>
  )
}

export default StorageSlot