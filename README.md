# Luggage Carousel Application

A modern React TypeScript application simulating a luggage carousel system with drag-and-drop functionality, storage management, and LIFO unload operations. Built with a clean, minimalistic retro design aesthetic.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rakesh-Singh-6789/luggage-carousel-.git
   cd luggage-carousel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Local: `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
luggage-carousel/
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── LuggageCarousel.tsx    # Main carousel with moving packages
│   │   ├── LuggageCarousel.css
│   │   ├── Package.tsx            # Individual package component
│   │   ├── Package.css
│   │   ├── StorageArea.tsx        # Storage grid container
│   │   ├── StorageArea.css
│   │   ├── StorageSlot.tsx        # Individual storage slot
│   │   ├── StorageSlot.css
│   │   ├── Toast.tsx              # Notification system
│   │   └── Toast.css
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLuggageManager.ts   # Main business logic
│   │   ├── useDragBehavior.ts     # Drag & drop handling
│   │   └── useToast.ts            # Toast notifications
│   ├── types/                 # TypeScript type definitions
│   │   └── dragTypes.ts           # Drag & drop interfaces
│   ├── App.tsx                # Root component
│   ├── App.css                # Global styles
│   ├── main.tsx               # Application entry point
│   └── index.css              # Base styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
## 📋 Business Logic & Assumptions

### Core Assumptions

1. **One Package Per Storage Slot**
   - Each storage slot can hold exactly one package
   - Attempting to drop on occupied slot shows notification with existing package number

2. **Sequential Package Numbering**
   - Packages are numbered incrementally: 1, 2, 3, 4...
   - Simple identification system for easy tracking

3. **Carousel Behavior**
   - Packages spawn every 1.25 seconds from the left
   - Move at 3px per frame (90px/second at 30 FPS)
   - Disappear smoothly when reaching the right end

4. **Storage Priority System**
   - Slots 0-2 (first row) are "priority" storage
   - Visual distinction with dashed border
   - LIFO unloading prioritizes this section

5. **Drag & Drop Rules**
   - Package disappears from carousel when drag starts
   - If dropped successfully in storage: package stays in storage
   - If dropped outside storage: package returns to carousel

### LIFO Implementation
```
Priority Stack (slots 0-2): [Last] -> [First]
Regular Stack (slots 3-8):  [Last] -> [First]

Unload Order:
1. Empty entire priority stack (LIFO)
2. Then empty regular stack (LIFO)
```

## ❓ Known Unknowns & Edge Cases

### Drag & Drop Behavior
- **Unknown**: What happens when user drops luggage outside the application window?
- **Current**: luggage will animate back to the carousel
... more :)

## 🔧 Technical Details
### Key Technologies
- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **CSS3** for animations and layout
- **HTML5 Drag & Drop API**
- **ESLint** for code quality
### State Management
- React hooks for local state
- Custom hooks for business logic separation
- No external state management library used
### Issues

1. **Packages not draggable on mobile, (to keep it simple, else touchEvent should suffice for this case)**
   - Ensure you're using a modern mobile browser
   - Try touch and hold, then drag