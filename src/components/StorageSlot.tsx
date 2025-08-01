import './StorageSlot.css'

interface StorageSlotProps {
  isPriority: boolean
  slotIndex: number
}

const StorageSlot = ({ isPriority, slotIndex }: StorageSlotProps) => {
  return (
    <div className={`storage-slot ${isPriority ? 'priority-slot' : ''}`}>
      {/* TODO: Empty storage slot cases */}
    </div>
  )
}

export default StorageSlot