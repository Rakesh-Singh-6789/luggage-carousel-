import { useRef, useCallback, useState, useEffect } from 'react'
import type { DragItem, DragResult } from '../types/dragTypes'

interface LuggageCarouselHandle {
  removePackage: (packageId: string) => void
  hidePackage: (packageId: string) => void
  showPackage: (packageId: string) => void
}

export const useLuggageManager = () => {
  const carouselRef = useRef<LuggageCarouselHandle>(null)
  const successfulDrops = useRef<Set<string>>(new Set())
  const unloadTimeoutRef = useRef<number | null>(null)
  const [storedPackages, setStoredPackages] = useState<(string | null)[]>(Array(9).fill(null))
  const [priorityStack, setPriorityStack] = useState<string[]>([])
  const [regularStack, setRegularStack] = useState<string[]>([])
  const [isUnloading, setIsUnloading] = useState(false)

  const handlePackageDragStart = useCallback((item: DragItem) => {
    console.log(`drag start: ${item.id}`)
    successfulDrops.current.delete(item.id)
    setTimeout(() => {
      if (item.sourceContainer === 'carousel') {
        carouselRef.current?.hidePackage(item.id)
        console.log(`hide pkg: ${item.id}`)
      }
    }, 10)
  }, [])

  const handlePackageDragEnd = useCallback((result: DragResult, item: DragItem) => {
    console.log(`drag end: ${item.id}, result: ${result}`)
    const wasSuccessful = successfulDrops.current.has(item.id)
    
    if (wasSuccessful) {
      console.log(`store success: ${item.id}`)
      if (item.sourceContainer === 'carousel') {
        carouselRef.current?.removePackage(item.id)
      }
    } else {
      console.log(`drag fail, restore: ${item.id}`)
      if (item.sourceContainer === 'carousel') {
        carouselRef.current?.showPackage(item.id)
      }
    }
    successfulDrops.current.delete(item.id)
  }, [])

  const handleDropSuccess = useCallback((packageId: string) => {
    console.log(`drop success: ${packageId}`)
    successfulDrops.current.add(packageId)
  }, [])

  const handlePackageStored = useCallback((slotIndex: number, packageId: string) => {
    console.log(`stored: pkg ${packageId} -> slot ${slotIndex}`)
    
    // Update the main grid
    setStoredPackages(prev => {
      const newStorage = [...prev]
      newStorage[slotIndex] = packageId
      return newStorage
    })
    
    // Push to the appropriate stack
    if (slotIndex >= 0 && slotIndex <= 2) {
      setPriorityStack(prev => [...prev, packageId])
      console.log('pushed to priority stack:', [...priorityStack, packageId])
    } else {
      setRegularStack(prev => [...prev, packageId])
      console.log('pushed to regular stack:', [...regularStack, packageId])
    }
    
    carouselRef.current?.removePackage(packageId)
  }, [priorityStack, regularStack])

  const unloadSinglePackage = useCallback(() => {
    let packageToUnload: string | undefined;
    
    // Rule #2: Unload from priority stack first (LIFO)
    if (priorityStack.length > 0) {
      const newPriorityStack = [...priorityStack]
      packageToUnload = newPriorityStack.pop()
      setPriorityStack(newPriorityStack)
      console.log(`unloading from priority: ${packageToUnload}`)
    } 
    // Rule #1: If priority is empty, unload from regular stack (LIFO)
    else if (regularStack.length > 0) {
      const newRegularStack = [...regularStack]
      packageToUnload = newRegularStack.pop()
      setRegularStack(newRegularStack)
      console.log(`unloading from regular: ${packageToUnload}`)
    }

    // If a package was identified for unloading, remove it from the grid
    if (packageToUnload) {
      setStoredPackages(prev => {
        const newStorage = [...prev]
        const slotIndex = newStorage.findIndex(id => id === packageToUnload)
        if (slotIndex !== -1) {
          console.log(`remove pkg ${packageToUnload} slot ${slotIndex}`)
          newStorage[slotIndex] = null
        }
        return newStorage
      })
      return true; // Package was unloaded
    }
    
    return false; // No packages to unload
  }, [priorityStack, regularStack])

  // Use useEffect to handle the continuous unloading
  const unloadLoop = useCallback(() => {
    if (!isUnloading) return
    
    const wasUnloaded = unloadSinglePackage()
    
    if (wasUnloaded) {
      // Check if there are more packages after this one is removed
      // We'll use useEffect to detect state changes
      console.log(`unloaded one package`)
    } else {
      console.log('no packages to unload')
      setIsUnloading(false)
      if (unloadTimeoutRef.current) {
        clearTimeout(unloadTimeoutRef.current)
        unloadTimeoutRef.current = null
      }
    }
  }, [isUnloading, unloadSinglePackage])

  // Effect to continue unloading when stacks change
  useEffect(() => {
    if (isUnloading && (priorityStack.length > 0 || regularStack.length > 0)) {
      console.log(`continuing unload: priority=${priorityStack.length}, regular=${regularStack.length}`)
      unloadTimeoutRef.current = setTimeout(unloadLoop, 1000)
    } else if (isUnloading && priorityStack.length === 0 && regularStack.length === 0) {
      console.log('unload sequence complete')
      setIsUnloading(false)
      if (unloadTimeoutRef.current) {
        clearTimeout(unloadTimeoutRef.current)
        unloadTimeoutRef.current = null
      }
    }
  }, [isUnloading, priorityStack.length, regularStack.length, unloadLoop])

  const handleUnload = useCallback(() => {
    if (isUnloading) {
      console.log('unload already in progress')
      return
    }

    console.log('start unload sequence')
    setIsUnloading(true)
    // The useEffect will trigger the first unload
  }, [isUnloading])

  return {
    carouselRef,
    storedPackages,
    isUnloading,
    handlers: {
      onPackageDragStart: handlePackageDragStart,
      onPackageDragEnd: handlePackageDragEnd,
      onDropSuccess: handleDropSuccess,
      onPackageStored: handlePackageStored,
      onUnload: handleUnload
    }
  }
}