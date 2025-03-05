import React from 'react';
import { ArtistData } from '../../types/lineup-types';

interface LineupStatsProps {
    sortedArtists: ArtistData[];
    allArtists: ArtistData[];
    selectedCount: number;
}

export const LineupStats: React.FC<LineupStatsProps> = ({
    sortedArtists,
    allArtists,
    selectedCount
}) => {
    return (
        <div className="mb-6 bg-black/60 p-4 rounded-lg border border-blue-400/30"
            style={{boxShadow: "0 0 10px rgba(0, 128, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)"}}>
            <p className="text-white font-medium" style={{textShadow: "0 0 3px rgba(255, 255, 255, 0.5)"}}>
                Total Artists: <span className="text-green-300 font-bold">{sortedArtists.length}</span> (of {allArtists.length}) |
                Selected: <span className="text-purple-300 font-bold">{selectedCount}</span> 
                {selectedCount > 0 && ` (${(selectedCount/sortedArtists.length*100).toFixed(1)}%)`}
            </p>
        </div>
    );
};