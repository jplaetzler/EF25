import { lazy, Suspense } from 'react'
import './App.css'
import { ThemeProvider } from './theme/ThemeContext'
import ThemeToggle from './theme/components/ThemeToggle'

const ElectricForestLineup = lazy(() => import('./components/ElectricForestLineup'))

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen w-full relative">
                {/* Firefly effect elements */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="fixed rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0,
                            filter: "blur(1px)",
                            backgroundColor: i % 3 === 0 ? "#00ff80" : i % 3 === 1 ? "#00ffff" : "#ff00ff",
                            boxShadow: i % 3 === 0 ? "0 0 5px rgba(0, 255, 128, 0.7)" :
                                i % 3 === 1 ? "0 0 5px rgba(0, 255, 255, 0.7)" :
                                    "0 0 5px rgba(255, 0, 255, 0.7)",
                            animation: `firefly ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
                
                {/* Theme toggle controls */}
                <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                </div>
                    
                <Suspense fallback={
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-forest-secondary text-xl font-bold" 
                             style={{ 
                                 textShadow: "0 0 8px rgba(0, 255, 128, 0.7)",
                                 animation: "pulse 1.5s infinite ease-in-out"
                             }}>
                            Loading the Forest...
                        </div>
                    </div>
                }>
                    <ElectricForestLineup />
                </Suspense>
            </div>
        </ThemeProvider>
    )
}

export default App