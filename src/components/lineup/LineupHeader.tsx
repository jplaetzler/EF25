import React from 'react';

export const LineupHeader: React.FC = () => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-300 to-purple-400"
                  style={{textShadow: '0 0 15px rgba(0, 255, 128, 0.5), 0 0 30px rgba(128, 0, 255, 0.3)'}}>
                ELECTRIC FOREST
            </h1>
            <p className="text-xl text-cyan-300 mb-2" style={{textShadow: '0 0 8px rgba(0, 255, 255, 0.6)'}}>
                JUNE 19-22, 2025 • ROTHBURY, MI
            </p>
            <div className="flex justify-center gap-2 my-4">
                <div className="h-0.5 w-20 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
                <div className="h-0.5 w-20 bg-gradient-to-l from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="text-green-400/80 text-sm italic">LINEUP EXPLORER</p>
        </div>
    );
};