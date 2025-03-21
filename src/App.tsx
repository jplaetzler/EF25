import { lazy, Suspense } from 'react'

const ElectricForestLineup = lazy(() => import('./components/ElectricForestLineup'))

function App() {
    return (

        <div className="min-h-screen w-full relative" style={{ width: '100%', maxWidth: '100%' }}>
                <Suspense fallback={
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-forest-secondary text-xl font-bold" 
                             style={{
                                 width: '100%',
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