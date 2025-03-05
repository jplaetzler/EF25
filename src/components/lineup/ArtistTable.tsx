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
        <div className="overflow-x-auto rounded-lg border border-green-400/20" 
            style={{
                boxShadow: "0 0 15px rgba(0, 255, 170, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.3)",
                background: "linear-gradient(to bottom, rgba(0,12,2,0.7), rgba(2,10,20,0.8))",
                backdropFilter: "blur(4px)"
            }}>
            <div className="min-w-[800px] md:min-w-0 h-full">
            <div className="relative">
                {/* Forest-inspired decorative element */}
                <div className="absolute top-0 left-0 w-24 h-24 opacity-5 pointer-events-none" 
                     style={{
                         backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M50,10 L25,90 L75,90 Z\" fill=\"%2300ff99\" /></svg>')",
                         backgroundSize: "contain",
                         backgroundRepeat: "no-repeat"
                     }}></div>
                
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none" 
                     style={{
                         backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M25,10 L50,90 L75,10 Z\" fill=\"%23aa77ff\" /></svg>')",
                         backgroundSize: "contain",
                         backgroundRepeat: "no-repeat"
                     }}></div>
                
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-green-900/80 via-purple-900/60 to-blue-900/80 text-white">
                            <th className="p-3 border-b border-green-400/30 text-center">
                                <span className="relative inline-block">
                                    <input
                                        type="checkbox"
                                        onChange={toggleAllArtists}
                                        checked={sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name])}
                                        className="h-4 w-4 rounded-sm bg-black/70 border border-green-400/70 checked:bg-green-500/70 focus:ring-0 focus:ring-offset-0 transition-all"
                                    />
                                    <span className="absolute inset-0 rounded-sm pointer-events-none" 
                                        style={{
                                            boxShadow: sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name]) 
                                                ? "0 0 3px 1px rgba(0, 255, 128, 0.7)" 
                                                : ""
                                        }}></span>
                                </span>
                            </th>
                            <th
                                className="p-3 border-b border-green-400/30 text-left cursor-pointer hover:bg-green-900/40 transition-colors"
                                onClick={() => handleSort("name")}
                            >
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1.5 1.5 0 004 7.3V16a1 1 0 001 1h10a1 1 0 001-1V7.3a1.5 1.5 0 00-1.046-1.427L11 4.323V3a1 1 0 00-1-1zM5.206 4.856L9.16 3.274 14.794 5.14A.5.5 0 0115 5.57v.044a.25.25 0 01-.25.25h-9.5a.25.25 0 01-.25-.25V5.57a.5.5 0 01.206-.415zM9.5 6.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z" clipRule="evenodd" />
                                    </svg>
                                    <span style={{textShadow: "0 0 5px rgba(0, 255, 128, 0.8)"}} 
                                          className={sortBy === "name" ? "text-green-300" : "text-green-100"}>
                                        Artist Name
                                    </span>
                                    {sortBy === "name" && (
                                        <span className="ml-2 text-green-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </span>
                            </th>
                            <th
                                className="p-3 border-b border-green-400/30 text-left cursor-pointer hover:bg-purple-900/40 transition-colors"
                                onClick={() => handleSort("category")}
                            >
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    <span style={{textShadow: "0 0 5px rgba(128, 0, 255, 0.8)"}}
                                          className={sortBy === "category" ? "text-purple-300" : "text-purple-100"}>
                                        Category
                                    </span>
                                    {sortBy === "category" && (
                                        <span className="ml-2 text-purple-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </span>
                            </th>
                            <th
                                className="p-3 border-b border-green-400/30 text-left cursor-pointer hover:bg-blue-900/40 transition-colors"
                                onClick={() => handleSort("day")}
                            >
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span style={{textShadow: "0 0 5px rgba(0, 128, 255, 0.8)"}}
                                          className={sortBy === "day" ? "text-blue-300" : "text-blue-100"}>
                                        Day
                                    </span>
                                    {sortBy === "day" && (
                                        <span className="ml-2 text-blue-300">{sortDirection === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </span>
                            </th>
                            {musicService !== "none" && (
                                <th className="p-3 border-b border-green-400/30 text-center">
                                    <span className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                        </svg>
                                        <span style={{textShadow: "0 0 5px rgba(255, 200, 0, 0.8)"}}>
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
                            let rowBackground = index % 2 === 0 ? 'bg-black/60' : 'bg-black/70';
                            let textStyle = {};
                            
                            if (selectedArtists[artist.name]) {
                                rowBackground = 'bg-gradient-to-r from-green-900/30 to-purple-900/20';
                                rowGlow = "0 0 10px rgba(0, 255, 128, 0.1)";
                            }
                            
                            if (artist.category === 'Headliner') {
                                textStyle = {
                                    textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
                                    fontWeight: "bold"
                                };
                            }
                            
                            return (
                                <tr
                                    key={index}
                                    className={`
                                        ${rowBackground}
                                        ${artist.category === 'Headliner' ? 'font-bold' : ''}
                                        hover:bg-blue-900/20 transition-colors text-white
                                    `}
                                    style={{
                                        ...textStyle,
                                        boxShadow: rowGlow
                                    }}
                                >
                                    <td className="p-3 border-b border-green-400/10 text-center">
                                        <span className="relative inline-block">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedArtists[artist.name]}
                                                onChange={() => toggleArtistSelection(artist.name)}
                                                className="h-4 w-4 rounded-sm bg-black/60 border border-green-400/60 checked:bg-green-500/70 focus:ring-0 focus:ring-offset-0 transition-all"
                                            />
                                            <span className="absolute inset-0 rounded-sm pointer-events-none" 
                                                style={{
                                                    boxShadow: selectedArtists[artist.name] 
                                                        ? "0 0 3px 1px rgba(0, 255, 128, 0.5)" 
                                                        : ""
                                                }}></span>
                                        </span>
                                    </td>
                                    <td className="p-3 border-b border-green-400/10">
                                        <div className="flex items-center">
                                            <span className={artist.category === 'Headliner' ? "text-cyan-100" : "text-white"}>
                                                {artist.name}
                                                {artist.category === 'Headliner' && (
                                                    <span className="inline-block w-2 h-2 ml-2 bg-green-400 rounded-full"
                                                        style={{
                                                            boxShadow: "0 0 5px rgba(0, 255, 128, 0.8)",
                                                            animation: "pulse 2s infinite ease-in-out"
                                                        }}></span>
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 border-b border-green-400/10">
                                        <span className={`
                                            px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center
                                            ${artist.category === 'Headliner' 
                                                ? 'bg-gradient-to-r from-purple-700/70 to-blue-700/70 text-cyan-200 border border-cyan-400/30' 
                                                : artist.category === 'Featured Artists'
                                                    ? 'bg-gradient-to-r from-green-800/70 to-blue-800/70 text-green-200 border border-green-400/30'
                                                    : 'bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-blue-200 border border-blue-400/30'
                                            }
                                        `}
                                            style={{
                                                boxShadow: artist.category === 'Headliner' 
                                                    ? "0 0 5px rgba(128, 0, 255, 0.5)" 
                                                    : artist.category === 'Featured Artists'
                                                        ? "0 0 5px rgba(0, 255, 128, 0.5)"
                                                        : "0 0 5px rgba(0, 128, 255, 0.5)"
                                            }}>
                                            {artist.category === 'Headliner' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            )}
                                            {artist.category}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b border-green-400/10">
                                        {artist.day && (
                                            <span className={`
                                                px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center 
                                                ${artist.day === 'Thursday' ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-400/30' : ''}
                                                ${artist.day === 'Friday' ? 'bg-purple-900/60 text-purple-200 border border-purple-400/30' : ''}
                                                ${artist.day === 'Saturday' ? 'bg-blue-900/60 text-blue-200 border border-blue-400/30' : ''}
                                                ${artist.day === 'Sunday' ? 'bg-green-900/60 text-green-200 border border-green-400/30' : ''}
                                                ${artist.day === 'Special' ? 'bg-amber-900/60 text-amber-200 border border-amber-400/30' : ''}
                                            `}
                                                style={{
                                                    boxShadow: artist.day === 'Thursday' ? "0 0 5px rgba(0, 210, 255, 0.4)" :
                                                              artist.day === 'Friday' ? "0 0 5px rgba(128, 0, 255, 0.4)" :
                                                              artist.day === 'Saturday' ? "0 0 5px rgba(0, 128, 255, 0.4)" :
                                                              artist.day === 'Sunday' ? "0 0 5px rgba(0, 255, 128, 0.4)" :
                                                              artist.day === 'Special' ? "0 0 5px rgba(255, 180, 0, 0.4)" : ""
                                                }}>
                                                {artist.day === 'Thursday' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {artist.day === 'Friday' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {artist.day === 'Saturday' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                                    </svg>
                                                )}
                                                {artist.day === 'Sunday' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {artist.day === 'Special' && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                                                    </svg>
                                                )}
                                                {artist.day}
                                            </span>
                                        )}
                                    </td>
                                    {musicService !== "none" && (
                                        <td className="p-3 border-b border-green-400/10 text-center">
                                            {musicService === "spotify" && artist.spotifyId ? (
                                                <a
                                                    href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-green-800/70 to-green-900/70 text-green-300 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center border border-green-500/30 hover:bg-green-800/90 transition-all"
                                                    style={{boxShadow: "0 0 5px rgba(0, 255, 128, 0.3)"}}
                                                >
                                                    <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                                                        <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
                                                    </svg>
                                                    Listen
                                                </a>
                                            ) : musicService === "youtube" && artist.youtubeId ? (
                                                <a
                                                    href={`https://www.youtube.com/channel/${artist.youtubeId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-red-800/70 to-red-900/70 text-red-300 rounded-full text-[10px] md:text-xs font-medium inline-flex items-center border border-red-500/30 hover:bg-red-800/90 transition-all"
                                                    style={{boxShadow: "0 0 5px rgba(255, 0, 0, 0.3)"}}
                                                >
                                                    <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                                                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                                                    </svg>
                                                    Watch
                                                </a>
                                            ) : (
                                                <span className="text-gray-500 text-xs">N/A</span>
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