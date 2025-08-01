import StorageSlot from './StorageSlot'
import './StorageArea.css'

interface StorageAreaProps {
  storedPackages: (string | null)[]
  isUnloading: boolean
  onPackageStored?: (slotIndex: number, packageId: string) => void
  onDropSuccess?: (packageId: string) => void
  onUnload?: () => void
}

const StorageArea = ({ storedPackages, isUnloading, onPackageStored, onDropSuccess, onUnload }: StorageAreaProps) => {

  const handlePackageDrop = (slotIndex: number, packageId: string) => {
    // Notify parent about the successful drop attempt
    onDropSuccess?.(packageId)
    // Notify parent to store the package
    onPackageStored?.(slotIndex, packageId)
  }

  return (
    <div className="storage-section">
      {/* Priority Section */}
      <div className="priority-section">
        <div className="storage-row">
          {Array.from({ length: 3 }, (_, index) => (
            <StorageSlot 
              key={index} 
              isPriority={true} 
              slotIndex={index}
              packageId={storedPackages[index] || undefined}
              onDrop={handlePackageDrop}
            />
          ))}
        </div>
      </div>
      
      {/* Regular Section */}
      <div className="storage-row">
        {Array.from({ length: 3 }, (_, index) => (
          <StorageSlot 
            key={index + 3} 
            isPriority={false} 
            slotIndex={index + 3}
            packageId={storedPackages[index + 3] || undefined}
            onDrop={handlePackageDrop}
          />
        ))}
      </div>
      <div className="storage-row">
        {Array.from({ length: 3 }, (_, index) => (
          <StorageSlot 
            key={index + 6} 
            isPriority={false} 
            slotIndex={index + 6}
            packageId={storedPackages[index + 6] || undefined}
            onDrop={handlePackageDrop}
          />
        ))}
      </div>
      
      <button 
        className={`unload-button ${isUnloading ? 'unloading' : ''}`}
        onClick={onUnload}
        disabled={isUnloading}
      >
        {isUnloading ? 'UNLOADING...' : 'UNLOAD'}
      </button>
    </div>
  )
}

export default StorageArea