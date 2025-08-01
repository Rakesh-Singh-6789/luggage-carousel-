import { useRef, useCallback } from 'react'
import type { DragItem, DragResult } from '../types/dragTypes'

interface LuggageCarouselHandle {
  removePackage: (packageId: string) => void
  hidePackage: (packageId: string) => void
  showPackage: (packageId: string) => void
}

export const useLuggageManager = () => {
  const carouselRef = useRef<LuggageCarouselHandle>(null)
  const successfulDrops = useRef<Set<string>>(new Set())

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
    carouselRef.current?.removePackage(packageId)
  }, [])

  const handleUnload = useCallback(() => {
    console.log('unload clicked')
  }, [])

  return {
    carouselRef,
    handlers: {
      onPackageDragStart: handlePackageDragStart,
      onPackageDragEnd: handlePackageDragEnd,
      onDropSuccess: handleDropSuccess,
      onPackageStored: handlePackageStored,
      onUnload: handleUnload
    }
  }
}