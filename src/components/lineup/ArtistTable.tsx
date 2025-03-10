// src/components/lineup/ArtistTable.tsx
import React from 'react';
import {ArtistData} from '../../types/lineup-types';

interface ArtistTableProps {
    sortedArtists: ArtistData[];
    selectedArtists: Record<string, boolean>;
    toggleArtistSelection: (artistName: string) => void;
    toggleAllArtists: () => void;
    handleSort: (column: string) => void;
    sortBy: string;
    sortDirection: string;
    musicService: string;
}

export const ArtistTable: React.FC<ArtistTableProps> = ({
                                                            sortedArtists,
                                                            selectedArtists,
                                                            toggleArtistSelection,
                                                            toggleAllArtists,
                                                            handleSort,
                                                            sortBy,
                                                            sortDirection,
                                                            musicService
                                                        }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
                <thead>
                <tr className="bg-black/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <input
                            type="checkbox"
                            onChange={toggleAllArtists}
                            checked={sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name])}
                            className="rounded text-green-500 focus:ring-green-500 bg-black/50 border-green-500/50"
                        />
                    </th>
                    <th
                        className="px-4 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("name")}
                        style={{textShadow: "0 0 5px rgba(0, 255, 128, 0.4)"}}
                    >
                        Artist
                        {sortBy === "name" && (
                            <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                    </th>
                    <th
                        className="px-4 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("category")}
                        style={{textShadow: "0 0 5px rgba(128, 0, 255, 0.4)"}}
                    >
                        Category
                        {sortBy === "category" && (
                            <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                    </th>
                    <th
                        className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("day")}
                        style={{textShadow: "0 0 5px rgba(0, 128, 255, 0.4)"}}
                    >
                        Day
                        {sortBy === "day" && (
                            <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider"
                        style={{textShadow: "0 0 5px rgba(255, 255, 0, 0.4)"}}>
                        Listen
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                {sortedArtists.map((artist, idx) => (
                    <tr key={artist.name} className={idx % 2 === 0 ? 'bg-black/30' : 'bg-black/50'}>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <input
                                type="checkbox"
                                checked={!!selectedArtists[artist.name]}
                                onChange={() => toggleArtistSelection(artist.name)}
                                className="rounded text-green-500 focus:ring-green-500 bg-black/50 border-green-500/50"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <div
                                className={`font-medium ${artist.category === 'Headliner' ? 'text-cyan-300 text-lg' : 'text-white'}`}
                                style={artist.category === 'Headliner' ? {textShadow: "0 0 8px rgba(0, 255, 255, 0.6)"} : {}}>
                                {artist.name}
                                {artist.category === 'Headliner' && (
                                    <span className="ml-2 inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                          style={{boxShadow: "0 0 5px rgba(0, 255, 255, 0.8)"}}></span>
                                )}
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <span style={{
                                display: 'inline-flex',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                lineHeight: '1.25',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                backgroundColor: artist.category === 'Headliner'
                                    ? 'rgba(8, 145, 178, 0.3)'
                                    : artist.category === 'Featured Artists'
                                        ? 'rgba(147, 51, 234, 0.3)'
                                        : 'rgba(59, 130, 246, 0.3)',
                                color: artist.category === 'Headliner'
                                    ? 'rgb(165, 243, 252)'
                                    : artist.category === 'Featured Artists'
                                        ? 'rgb(216, 180, 254)'
                                        : 'rgb(191, 219, 254)',
                                border: artist.category === 'Headliner'
                                    ? '1px solid rgba(14, 165, 233, 0.2)'
                                    : artist.category === 'Featured Artists'
                                        ? '1px solid rgba(168, 85, 247, 0.2)'
                                        : '1px solid rgba(96, 165, 250, 0.2)',
                                boxShadow: artist.category === 'Headliner'
                                    ? '0 0 5px rgba(56, 189, 248, 0.3)'
                                    : artist.category === 'Featured Artists'
                                        ? '0 0 5px rgba(192, 132, 252, 0.3)'
                                        : '0 0 5px rgba(147, 197, 253, 0.3)'
                            }}>
        {artist.category}
    </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
    <span style={{
        display: 'inline-flex',
        fontSize: '0.75rem',
        fontWeight: '600',
        lineHeight: '1.25',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: artist.day === 'Thursday'
            ? 'rgba(13, 148, 136, 0.3)'
            : artist.day === 'Friday'
                ? 'rgba(147, 51, 234, 0.3)'
                : artist.day === 'Saturday'
                    ? 'rgba(37, 99, 235, 0.3)'
                    : artist.day === 'Sunday'
                        ? 'rgba(22, 163, 74, 0.3)'
                        : artist.day === 'Special'
                            ? 'rgba(217, 119, 6, 0.3)'
                            : 'rgba(75, 85, 99, 0.3)',
        color: artist.day === 'Thursday'
            ? 'rgb(153, 246, 228)'
            : artist.day === 'Friday'
                ? 'rgb(216, 180, 254)'
                : artist.day === 'Saturday'
                    ? 'rgb(191, 219, 254)'
                    : artist.day === 'Sunday'
                        ? 'rgb(187, 247, 208)'
                        : artist.day === 'Special'
                            ? 'rgb(254, 215, 170)'
                            : 'rgb(209, 213, 219)',
        border: artist.day === 'Thursday'
            ? '1px solid rgba(20, 184, 166, 0.2)'
            : artist.day === 'Friday'
                ? '1px solid rgba(168, 85, 247, 0.2)'
                : artist.day === 'Saturday'
                    ? '1px solid rgba(59, 130, 246, 0.2)'
                    : artist.day === 'Sunday'
                        ? '1px solid rgba(34, 197, 94, 0.2)'
                        : artist.day === 'Special'
                            ? '1px solid rgba(245, 158, 11, 0.2)'
                            : '1px solid rgba(107, 114, 128, 0.2)',
        boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)'
    }}>
        {artist.day || 'TBA'}
    </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            {musicService === "spotify" && artist.spotifyId ? (
                                <a
                                    href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        backgroundColor: 'rgba(22, 101, 52, 0.5)',
                                        color: 'rgb(134, 239, 172)',
                                        border: '1px solid rgba(16, 185, 129, 0.2)',
                                        boxShadow: '0 0 8px rgba(34, 197, 94, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(22, 101, 52, 0.7)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(22, 101, 52, 0.5)';
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5563 16.0637C16.3204 16.4355 15.8276 16.5373 15.4558 16.3015C13.3177 15.0206 10.6461 14.6807 7.26349 15.4145C6.83974 15.5129 6.41938 15.2458 6.32099 14.822C6.22261 14.3983 6.48972 13.9779 6.91346 13.8795C10.6461 13.057 13.6576 13.4532 16.1184 14.9632C16.4903 15.1991 16.5921 15.6919 16.3563 16.0637ZM17.8345 13.4999C17.5415 13.9667 16.9227 14.0939 16.4559 13.801C14.0186 12.3275 10.358 11.8267 7.15799 12.7146C6.63546 12.8648 6.09693 12.5721 5.94676 12.0496C5.79659 11.527 6.08931 10.9885 6.61184 10.8383C10.2781 9.82165 14.3764 10.3842 17.2334 12.1213C17.7002 12.4143 17.8274 13.0331 17.5345 13.4999Z" />
                                    </svg>
                                    Spotify
                                </a>
                            ) : musicService === "youtube" && artist.youtubeId ? (
                                <a
                                    href={`https://www.youtube.com/channel/${artist.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-red-800/50 text-red-300 rounded-full text-xs font-medium inline-flex items-center border border-red-500/20 hover:bg-red-700/70 transition-all"
                                    style={{boxShadow: "0 0 8px rgba(255, 0, 0, 0.3)"}}
                                >
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    YouTube
                                </a>
                            ) : (
                                <span className="text-gray-500 text-sm">N/A</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};