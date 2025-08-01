import './Package.css'

interface PackageProps {
  id: string
  position: number
  type?: 'luggage' // can be more fun if we add more types :)
}

const Package = ({ id, position, type = 'luggage' }: PackageProps) => {
  return (
    <div 
      className={`package package-${type}`}
      style={{ left: `${position}px` }}
    >
      {/* Package representation */}
    </div>
  )
}

export default Package