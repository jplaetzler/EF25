import React from 'react';

export const LineupHeader: React.FC = () => {
    return (
        <div className="text-center mb-8 relative">
            {/* Forest texture background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{
                     backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M50,10 L60,40 L40,40 Z M30,30 L35,50 L25,50 Z M70,30 L75,50 L65,50 Z\" fill=\"%2300ff99\" /></svg>')",
                     backgroundSize: "150px 150px",
                     mixBlendMode: "overlay"
                 }}></div>

            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 tracking-wider"
                    style={{
                        textShadow: "0 0 10px rgba(0, 255, 170, 0.7), 0 0 20px rgba(128, 0, 255, 0.5)",
                        letterSpacing: "0.05em"
                    }}>
                    ELECTRIC FOREST
                </h1>
                <div className="text-xl md:text-2xl font-bold bg-clip-text bg-gradient-to-r from-cyan-400 to-green-300 mb-2"
                     style={{textShadow: "0 0 8px rgba(0, 255, 170, 0.5)"}}>
                    2025
                </div>
                <p className="text-blue-200 mb-3 text-sm md:text-base lg:text-lg" 
                    style={{textShadow: "0 0 5px #00eeff"}}>
                    June 19-22, 2025 • Rothbury, MI
                </p>
                
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
                    <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-400"
                         style={{animation: "pulse 2s infinite ease-in-out"}}></div>
                    <div className="w-12 md:w-20 h-0.5 bg-gradient-to-l from-green-400 to-transparent rounded-full"></div>
                </div>
                
                <p className="text-green-300/70 text-sm italic">
                    Explore the magical lineup of the forest
                </p>
            </div>
        </div>
    );
};