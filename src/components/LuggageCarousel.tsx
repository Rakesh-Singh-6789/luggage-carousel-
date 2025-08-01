import { useState, useEffect } from 'react'
import Package from './Package'
import './LuggageCarousel.css'

interface PackageData {
  id: string
  position: number
  type: 'luggage'
}

const LuggageCarousel = () => {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [nextId, setNextId] = useState(1)

  // Animation loop - move packages from left to right (30 FPS)
  useEffect(() => {
    let animationId: number
    let lastTime = 0
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 33) { // 30 FPS = ~33ms per frame
        setPackages(prevPackages => 
          prevPackages
            .map(pkg => ({
              ...pkg,
              position: pkg.position + 3 // Move 3px per frame for smoother motion
            }))
            .filter(pkg => pkg.position < 950) // Remove packages that go off screen
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
          id: `package-${nextId}`,
          position: -60, // Start further off-screen to prevent stacking
          type: 'luggage' as const
        }
      ])
      
      setNextId(prev => prev + 1)
    }, 2000) // New package every 2.5 seconds for better spacing

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
          />
        ))}
      </div>
    </div>
  )
}

export default LuggageCarousel