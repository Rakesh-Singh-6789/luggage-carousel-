import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Luggage Carousel</h1>
      <div className="main-container">
        {/* Luggage Carousel Belt will go here */}
        <div className="carousel-section">
          <h2>Luggage Carousel</h2>
          <div className="carousel-belt">
            {/* Moving packages will be here */}
          </div>
        </div>
        
        {/* Storage Area will go here */}
        <div className="storage-section">
          <div className="storage-grid">
            {/* 3x3 grid will be here */}
          </div>
          <button className="unload-button">UNLOAD</button>
        </div>
      </div>
    </div>
  )
}

export default App
