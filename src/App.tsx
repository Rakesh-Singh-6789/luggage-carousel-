import LuggageCarousel from './components/LuggageCarousel'
import StorageArea from './components/StorageArea'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Luggage Carousel</h1>
      <div className="main-container">
        <LuggageCarousel />
        <StorageArea />
      </div>
    </div>
  )
}

export default App
