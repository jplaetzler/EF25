import React from 'react';
import { ArtistData, ColumnPreferences } from '../../types/lineup-types';

interface TextExportProps {
    copyRef: React.RefObject<HTMLTextAreaElement>;
    selectedArtists: Record<string, boolean>;
    sortedArtists: ArtistData[];
    columnPreferences: ColumnPreferences;
}

export const TextExport: React.FC<TextExportProps> = ({
    copyRef,
    selectedArtists,
    sortedArtists,
    columnPreferences
}) => {
    // Generate the export text content
    const getExportText = () => {
        const artistsToShow = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        return artistsToShow.map(artist => {
            let parts = [];
            if (columnPreferences.name) parts.push(artist.name);
            if (columnPreferences.category) parts.push(artist.category);
            if (columnPreferences.day && artist.day) parts.push(artist.day);
            return parts.join(' - ');
        }).join('\n');
    };

    return (
        <div className="mt-6">
            <p className="text-sm font-medium mb-2 text-teal-300" style={{textShadow: "0 0 3px rgba(0, 255, 170, 0.5)"}}>
                Alternative: Copy from text below
            </p>
            <textarea
                ref={copyRef}
                className="w-full h-32 p-3 border border-teal-400/30 rounded-lg text-sm font-mono bg-black/60 text-green-100"
                style={{boxShadow: "0 0 10px rgba(0, 255, 170, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.5)"}}
                readOnly
                value={getExportText()}
            />
        </div>
    );
};