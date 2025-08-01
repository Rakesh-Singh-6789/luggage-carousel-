import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import Package from './Package'
import type { DragItem, DragResult } from '../types/dragTypes'
import './LuggageCarousel.css'

interface PackageData {
  id: string
  position: number
  type: 'luggage'
  isHidden?: boolean
  isExiting?: boolean
}

interface LuggageCarouselProps {
  onPackageDragStart?: (item: DragItem) => void
  onPackageDragEnd?: (result: DragResult, item: DragItem) => void
}

interface LuggageCarouselHandle {
  removePackage: (packageId: string) => void
  hidePackage: (packageId: string) => void
  showPackage: (packageId: string) => void
}

const LuggageCarousel = forwardRef<LuggageCarouselHandle, LuggageCarouselProps>(({ onPackageDragStart, onPackageDragEnd }, ref) => {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [nextId, setNextId] = useState(1)

  // Expose package management methods to parent
  useImperativeHandle(ref, () => ({
    removePackage: (packageId: string) => {
      console.log(`remove pkg: ${packageId}`)
      setPackages(prev => prev.filter(p => p.id !== packageId))
    },
    hidePackage: (packageId: string) => {
      console.log(`hide pkg: ${packageId}`)
      setPackages(prev => prev.map(p => 
        p.id === packageId ? { ...p, isHidden: true } : p
      ))
    },
    showPackage: (packageId: string) => {
      console.log(`show pkg: ${packageId}`)
      setPackages(prev => prev.map(p => 
        p.id === packageId ? { ...p, isHidden: false } : p
      ))
    }
  }))

  // Animation loop - move packages from left to right (30 FPS)
  useEffect(() => {
    let animationId: number
    let lastTime = 0
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 33) { // 30 FPS = ~33ms per frame
        setPackages(prevPackages => 
          prevPackages
            .map(pkg => {
              const newPosition = pkg.position + 3 // Move 3px per frame for smoother motion
              
              // Mark packages as exiting when they reach the visible edge
              const isExiting = newPosition >= 850 && !pkg.isExiting
              
              return {
                ...pkg,
                position: newPosition,
                isExiting: isExiting || pkg.isExiting
              }
            })
            .filter(pkg => pkg.position < 1100) // Remove packages well after they're off screen
        )
        lastTime = currentTime
      }
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Spawn new packages periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setPackages(prevPackages => [
        ...prevPackages,
        {
          id: `${nextId}`, // Simple numbering: 1, 2, 3, 4...
          position: -60, // Start further off-screen to prevent stacking
          type: 'luggage' as const
        }
      ])
      
      setNextId(prev => prev + 1)
    }, 1250) // New package every 1 seconds for better spacing

    return () => clearInterval(spawnInterval)
  }, [nextId])

  return (
    <div className="carousel-section">
      <div className="carousel-belt">
        {packages.map(pkg => (
          <Package
            key={pkg.id}
            id={pkg.id}
            position={pkg.position}
            type={pkg.type}
            isHidden={pkg.isHidden}
            isExiting={pkg.isExiting}
            onDragStart={onPackageDragStart}
            onDragEnd={onPackageDragEnd}
          />
        ))}
      </div>
    </div>
  )
})


export default LuggageCarousel