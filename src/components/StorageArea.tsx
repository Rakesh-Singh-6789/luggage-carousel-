import { useState } from 'react'
import StorageSlot from './StorageSlot'
import './StorageArea.css'

interface StorageAreaProps {
  onPackageStored?: (slotIndex: number, packageId: string) => void
  onDropSuccess?: (packageId: string) => void
  onUnload?: () => void
}

const StorageArea = ({ onPackageStored, onDropSuccess, onUnload }: StorageAreaProps) => {
  const [storedPackages, setStoredPackages] = useState<(string | null)[]>(Array(9).fill(null))

  const handlePackageDrop = (slotIndex: number, packageId: string) => {
    console.log(`Handling package drop: ${packageId} into slot ${slotIndex}`)
    
    // Only proceed if slot is empty
    if (storedPackages[slotIndex] === null) {
      setStoredPackages(prev => {
        const newStorage = [...prev]
        newStorage[slotIndex] = packageId
        console.log('Updated storage:', newStorage)
        return newStorage
      })
      
      // Notify about successful drop (for drag state management)
      onDropSuccess?.(packageId)
      
      // Notify parent that package was successfully stored
      onPackageStored?.(slotIndex, packageId)
      return true
    }
    return false
  }

  const handleUnload = () => {
    // LIFO unloading logic will go here
    onUnload?.()
  }

  return (
    <div className="storage-section">
      <div className="storage-grid">
        {/* 3x3 fixed grid with individual slots */}
        {Array.from({ length: 9 }, (_, index) => (
          <StorageSlot 
            key={index} 
            isPriority={index < 3} 
            slotIndex={index}
            packageId={storedPackages[index] || undefined}
            onDrop={handlePackageDrop}
          />
        ))}
      </div>
      <button className="unload-button" onClick={handleUnload}>UNLOAD</button>
    </div>
  )
}

export default StorageArea