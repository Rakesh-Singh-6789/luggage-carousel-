import LuggageCarousel from './components/LuggageCarousel'
import StorageArea from './components/StorageArea'
import { useLuggageManager } from './hooks/useLuggageManager'
import './App.css'

function App() {
  const { carouselRef, storedPackages, isUnloading, handlers } = useLuggageManager()

  return (
    <div className="app">
      <div className="outer-box">
        <h1>Luggage Carousel</h1>
        <div className="main-container">
          <LuggageCarousel 
            ref={carouselRef}
            onPackageDragStart={handlers.onPackageDragStart}
            onPackageDragEnd={handlers.onPackageDragEnd}
          />
                  <StorageArea 
          storedPackages={storedPackages}
          isUnloading={isUnloading}
          onPackageStored={handlers.onPackageStored}
          onDropSuccess={handlers.onDropSuccess}
          onUnload={handlers.onUnload} 
        />
        </div>
      </div>
    </div>
  )
}

export default App
