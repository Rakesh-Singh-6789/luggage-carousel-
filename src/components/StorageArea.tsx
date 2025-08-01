import StorageSlot from './StorageSlot'
import './StorageArea.css'

const StorageArea = () => {
  return (
    <div className="storage-section">
      <div className="storage-grid">
        {/* 3x3 fixed grid with individual slots */}
        {Array.from({ length: 9 }, (_, index) => (
          <StorageSlot 
            key={index} 
            isPriority={index < 3} 
            slotIndex={index}
          />
        ))}
      </div>
      <button className="unload-button">UNLOAD</button>
    </div>
  )
}

export default StorageArea