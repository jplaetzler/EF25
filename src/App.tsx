import { lazy, Suspense } from 'react'
import './App.css'
const ElectricForestLineup = lazy(() => import('./components/ElectricForestLineup'))

function App() {
    return (
        <div className="min-h-screen w-full relative">
            {/* Firefly effect elements */}
            <div className="fixed w-2 h-2 bg-green-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '20%', 
                    left: '10%',
                    animation: 'firefly 3s infinite ease-in-out',
                    animationDelay: '0.5s'
                }}></div>
            <div className="fixed w-1 h-1 bg-blue-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '35%', 
                    left: '80%',
                    animation: 'firefly 4s infinite ease-in-out',
                    animationDelay: '1.2s'
                }}></div>
            <div className="fixed w-2 h-2 bg-purple-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '70%', 
                    left: '25%',
                    animation: 'firefly 5s infinite ease-in-out',
                    animationDelay: '0.8s'
                }}></div>
            <div className="fixed w-1 h-1 bg-teal-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '55%', 
                    left: '90%',
                    animation: 'firefly 3.5s infinite ease-in-out',
                    animationDelay: '1.7s'
                }}></div>
            <div className="fixed w-2 h-2 bg-green-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '85%', 
                    left: '60%',
                    animation: 'firefly 4.5s infinite ease-in-out',
                    animationDelay: '2.1s'
                }}></div>
            <div className="fixed w-1 h-1 bg-indigo-400 rounded-full opacity-0 blur-[1px]" 
                style={{ 
                    top: '15%', 
                    left: '45%',
                    animation: 'firefly 5s infinite ease-in-out',
                    animationDelay: '1.5s'
                }}></div>
                
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                    <div className="text-green-500 text-xl font-bold" 
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
    )
}

export default App