import React from 'react';
import { ArtistData } from '../../types/lineup-types';

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
                    <tr>
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
                        >
                            Artist
                            {sortBy === "name" && (
                                <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                        </th>
                        <th 
                            className="px-4 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("category")}
                        >
                            Category
                            {sortBy === "category" && (
                                <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                        </th>
                        <th 
                            className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("day")}
                        >
                            Day
                            {sortBy === "day" && (
                                <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                            )}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
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
                                <div className={`font-medium ${artist.category === 'Headliner' ? 'text-cyan-300 text-lg' : 'text-white'}`}>
                                    {artist.name}
                                    {artist.category === 'Headliner' && (
                                        <span className="ml-2 inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${artist.category === 'Headliner' 
                                        ? 'bg-cyan-900/50 text-cyan-200 border border-cyan-400/20' 
                                        : artist.category === 'Featured Artists' 
                                            ? 'bg-purple-900/50 text-purple-200 border border-purple-400/20'
                                            : 'bg-blue-900/50 text-blue-200 border border-blue-400/20'}`}
                                >
                                    {artist.category}
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${artist.day === 'Thursday' ? 'bg-teal-900/50 text-teal-200 border border-teal-400/20' : ''}
                                    ${artist.day === 'Friday' ? 'bg-purple-900/50 text-purple-200 border border-purple-400/20' : ''}
                                    ${artist.day === 'Saturday' ? 'bg-blue-900/50 text-blue-200 border border-blue-400/20' : ''}
                                    ${artist.day === 'Sunday' ? 'bg-green-900/50 text-green-200 border border-green-400/20' : ''}
                                    ${artist.day === 'Special' ? 'bg-amber-900/50 text-amber-200 border border-amber-400/20' : ''}
                                    ${!artist.day ? 'bg-gray-800/50 text-gray-300 border border-gray-500/20' : ''}`}
                                >
                                    {artist.day || 'TBA'}
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {musicService === "spotify" && artist.spotifyId ? (
                                    <a
                                        href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-green-800/50 text-green-300 rounded-full text-xs font-medium inline-flex items-center border border-green-500/20 hover:bg-green-700/70 transition-all"
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
                                    >
                                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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