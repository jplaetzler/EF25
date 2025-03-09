import React from 'react';
import { ArtistData } from '../../types/lineup-types';
import Icon from '../../theme/components/Icon';

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
        <div className="overflow-x-auto rounded-lg border border-green-400/20" 
            style={{
                boxShadow: "0 0 15px rgba(0, 255, 170, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.3)",
                background: "linear-gradient(to bottom, rgba(0,12,2,0.8), rgba(2,10,20,0.9))",
                backdropFilter: "blur(8px)"
            }}>
            <div className="min-w-[800px] md:min-w-0 h-full">
            <div className="relative">
                {/* Forest-inspired decorative element */}
                <div className="absolute top-0 left-0 w-24 h-24 opacity-3 pointer-events-none" 
                     style={{
                         backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M50,10 L25,90 L75,90 Z\" fill=\"%2300ff99\" /></svg>')",
                         backgroundSize: "contain",
                         backgroundRepeat: "no-repeat"
                     }}></div>
                
                <div className="absolute top-0 right-0 w-24 h-24 opacity-3 pointer-events-none" 
                     style={{
                         backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M25,10 L50,90 L75,10 Z\" fill=\"%23aa77ff\" /></svg>')",
                         backgroundSize: "contain",
                         backgroundRepeat: "no-repeat"
                     }}></div>
                
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-green-900/70 via-purple-900/50 to-blue-900/70 text-white">
                            <th className="p-4 border-b border-green-400/20 text-center">
                                <span className="relative inline-block">
                                    <input
                                        type="checkbox"
                                        onChange={toggleAllArtists}
                                        checked={sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name])}
                                        className="h-4 w-4 rounded-sm bg-black/70 border border-green-400/60 checked:bg-green-500/60 focus:ring-0 focus:ring-offset-0 transition-all"
                                    />
                                    <span className="absolute inset-0 rounded-sm pointer-events-none" 
                                        style={{
                                            boxShadow: sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name]) 
                                                ? "0 0 3px 1px rgba(0, 255, 128, 0.6)" 
                                                : ""
                                        }}></span>
                                </span>
                            </th>
                            <th
                                className="p-4 border-b border-green-400/20 text-left cursor-pointer hover:bg-green-900/30 transition-colors"
                                onClick={() => handleSort("name")}
                            >
                                <span className="flex items-center space-x-2">
                                    <Icon 
                                      name="filter" 
                                      className="w-4 h-4 md:w-5 md:h-5 text-green-300" 
                                    />
                                    <span style={{textShadow: "0 0 4px rgba(0, 255, 128, 0.6)"}} 
                                          className={`${sortBy === "name" ? "text-green-300 font-medium" : "text-green-100"} text-sm md:text-base`}>
                                        Artist Name
                                        {sortBy === "name" && (
                                            <span className="ml-2 text-green-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </span>
                                </span>
                            </th>
                            <th
                                className="p-4 border-b border-green-400/20 text-left cursor-pointer hover:bg-purple-900/30 transition-colors"
                                onClick={() => handleSort("category")}
                            >
                                <span className="flex items-center space-x-2">
                                    <Icon 
                                      name="sort" 
                                      className="w-4 h-4 md:w-5 md:h-5 text-purple-300" 
                                    />
                                    <span style={{textShadow: "0 0 4px rgba(128, 0, 255, 0.6)"}}
                                          className={`${sortBy === "category" ? "text-purple-300 font-medium" : "text-purple-100"} text-sm md:text-base`}>
                                        Category
                                        {sortBy === "category" && (
                                            <span className="ml-2 text-purple-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </span>
                                </span>
                            </th>
                            <th
                                className="p-4 border-b border-green-400/20 text-left cursor-pointer hover:bg-blue-900/30 transition-colors"
                                onClick={() => handleSort("day")}
                            >
                                <span className="flex items-center space-x-2">
                                    <Icon 
                                      name="calendar" 
                                      className="w-4 h-4 md:w-5 md:h-5 text-blue-300" 
                                    />
                                    <span style={{textShadow: "0 0 4px rgba(0, 128, 255, 0.6)"}}
                                          className={`${sortBy === "day" ? "text-blue-300 font-medium" : "text-blue-100"} text-sm md:text-base`}>
                                        Day
                                        {sortBy === "day" && (
                                            <span className="ml-2 text-blue-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </span>
                                </span>
                            </th>
                            {musicService !== "none" && (
                                <th className="p-4 border-b border-green-400/20 text-center">
                                    <span className="flex items-center justify-center space-x-2">
                                        <Icon 
                                          name="headphones" 
                                          className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" 
                                        />
                                        <span style={{textShadow: "0 0 4px rgba(255, 200, 0, 0.6)"}}
                                              className="text-yellow-200 text-sm md:text-base">
                                            {musicService === "spotify" ? "Spotify" : "YouTube"}
                                        </span>
                                    </span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedArtists.map((artist, index) => {
                            // Determine electric forest theme color scheme based on category and selection status
                            let rowGlow = "";
                            let rowBackground = index % 2 === 0 ? 'bg-black/50' : 'bg-black/60';
                            let textStyle = {};
                            
                            if (selectedArtists[artist.name]) {
                                rowBackground = 'bg-gradient-to-r from-green-900/20 to-purple-900/10';
                                rowGlow = "0 0 10px rgba(0, 255, 128, 0.05)";
                            }
                            
                            if (artist.category === 'Headliner') {
                                textStyle = {
                                    textShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
                                    fontWeight: "bold"
                                };
                            }
                            
                            return (
                                <tr
                                    key={index}
                                    className={`
                                        ${rowBackground}
                                        ${artist.category === 'Headliner' ? 'font-bold' : ''}
                                        hover:bg-blue-900/10 transition-colors text-white
                                    `}
                                    style={{
                                        ...textStyle,
                                        boxShadow: rowGlow
                                    }}
                                >
                                    <td className="py-4 px-4 border-b border-green-400/10 text-center">
                                        <span className="relative inline-block">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedArtists[artist.name]}
                                                onChange={() => toggleArtistSelection(artist.name)}
                                                className="h-4 w-4 rounded-sm bg-black/50 border border-green-400/50 checked:bg-green-500/60 focus:ring-0 focus:ring-offset-0 transition-all"
                                            />
                                            <span className="absolute inset-0 rounded-sm pointer-events-none" 
                                                style={{
                                                    boxShadow: selectedArtists[artist.name] 
                                                        ? "0 0 3px 1px rgba(0, 255, 128, 0.4)" 
                                                        : ""
                                                }}></span>
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 border-b border-green-400/10">
                                        <div className="flex items-center">
                                            <span className={artist.category === 'Headliner' ? "text-cyan-100" : "text-white"}>
                                                {artist.name}
                                                {artist.category === 'Headliner' && (
                                                    <span className="inline-block w-2 h-2 ml-2 bg-green-400/90 rounded-full"
                                                        style={{
                                                            boxShadow: "0 0 4px rgba(0, 255, 128, 0.6)",
                                                            animation: "pulse 2s infinite ease-in-out"
                                                        }}></span>
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 border-b border-green-400/10">
                                        <span className={`
                                            px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium inline-flex items-center
                                            ${artist.category === 'Headliner' 
                                                ? 'bg-gradient-to-r from-purple-700/50 to-blue-700/50 text-cyan-200 border border-cyan-400/20' 
                                                : artist.category === 'Featured Artists'
                                                    ? 'bg-gradient-to-r from-green-800/50 to-blue-800/50 text-green-200 border border-green-400/20'
                                                    : 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-200 border border-blue-400/20'
                                            }
                                        `}
                                            style={{
                                                boxShadow: artist.category === 'Headliner' 
                                                    ? "0 0 4px rgba(128, 0, 255, 0.3)" 
                                                    : artist.category === 'Featured Artists'
                                                        ? "0 0 4px rgba(0, 255, 128, 0.3)"
                                                        : "0 0 4px rgba(0, 128, 255, 0.3)"
                                            }}>
                                            {artist.category === 'Headliner' && (
                                                <Icon name="star" className="w-4 h-4 mr-1.5" />
                                            )}
                                            {artist.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 border-b border-green-400/10">
                                        {artist.day && (
                                            <span className={`
                                                px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium inline-flex items-center 
                                                ${artist.day === 'Thursday' ? 'bg-cyan-900/50 text-cyan-200 border border-cyan-400/20' : ''}
                                                ${artist.day === 'Friday' ? 'bg-purple-900/50 text-purple-200 border border-purple-400/20' : ''}
                                                ${artist.day === 'Saturday' ? 'bg-blue-900/50 text-blue-200 border border-blue-400/20' : ''}
                                                ${artist.day === 'Sunday' ? 'bg-green-900/50 text-green-200 border border-green-400/20' : ''}
                                                ${artist.day === 'Special' ? 'bg-amber-900/50 text-amber-200 border border-amber-400/20' : ''}
                                            `}
                                                style={{
                                                    boxShadow: artist.day === 'Thursday' ? "0 0 4px rgba(0, 210, 255, 0.3)" :
                                                              artist.day === 'Friday' ? "0 0 4px rgba(128, 0, 255, 0.3)" :
                                                              artist.day === 'Saturday' ? "0 0 4px rgba(0, 128, 255, 0.3)" :
                                                              artist.day === 'Sunday' ? "0 0 4px rgba(0, 255, 128, 0.3)" :
                                                              artist.day === 'Special' ? "0 0 4px rgba(255, 180, 0, 0.3)" : ""
                                                }}>
                                                {artist.day === 'Thursday' && (
                                                    <Icon name="thursday" className="w-4 h-4 mr-1.5" />
                                                )}
                                                {artist.day === 'Friday' && (
                                                    <Icon name="friday" className="w-4 h-4 mr-1.5" />
                                                )}
                                                {artist.day === 'Saturday' && (
                                                    <Icon name="saturday" className="w-4 h-4 mr-1.5" />
                                                )}
                                                {artist.day === 'Sunday' && (
                                                    <Icon name="sunday" className="w-4 h-4 mr-1.5" />
                                                )}
                                                {artist.day === 'Special' && (
                                                    <Icon name="special" className="w-4 h-4 mr-1.5" />
                                                )}
                                                {artist.day}
                                            </span>
                                        )}
                                    </td>
                                    {musicService !== "none" && (
                                        <td className="py-4 px-4 border-b border-green-400/10 text-center">
                                            {musicService === "spotify" && artist.spotifyId ? (
                                                <a
                                                    href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-800/50 to-green-900/50 text-green-300 rounded-full text-xs md:text-sm font-medium inline-flex items-center border border-green-500/20 hover:bg-green-800/70 transition-all"
                                                    style={{boxShadow: "0 0 4px rgba(0, 255, 128, 0.2)"}}
                                                >
                                                    <Icon name="spotify" className="w-4 h-4 md:w-5 md:h-5 mr-1.5" />
                                                    Listen
                                                </a>
                                            ) : musicService === "youtube" && artist.youtubeId ? (
                                                <a
                                                    href={`https://music.youtube.com/channel/${artist.youtubeId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-red-800/50 to-red-900/50 text-red-300 rounded-full text-xs md:text-sm font-medium inline-flex items-center border border-red-500/20 hover:bg-red-800/70 transition-all"
                                                    style={{boxShadow: "0 0 4px rgba(255, 0, 0, 0.2)"}}
                                                >
                                                    <Icon name="youtube" className="w-4 h-4 md:w-5 md:h-5 mr-1.5" />
                                                    Watch
                                                </a>
                                            ) : (
                                                <span className="text-gray-500 text-sm">N/A</span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};