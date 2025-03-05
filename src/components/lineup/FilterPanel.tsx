import React from 'react';

interface FilterPanelProps {
    filter: string;
    setFilter: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    day: string;
    setDay: (value: string) => void;
    days: string[];
    musicService: string;
    setMusicService: (value: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    filter,
    setFilter,
    category,
    setCategory,
    day,
    setDay,
    days,
    musicService,
    setMusicService
}) => {
    return (
        <div className="relative mb-8">
            {/* Forest-inspired background effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                 style={{
                     backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M10,90 L50,30 L90,90 Z\" fill=\"%2300ff99\" /></svg>')",
                     backgroundSize: "100px 100px",
                     mixBlendMode: "overlay"
                 }}></div>
                 
            <div className="bg-gradient-to-r from-green-900/30 via-blue-900/20 to-purple-900/30 p-5 rounded-lg border border-green-500/20 backdrop-blur-sm"
                 style={{boxShadow: "0 0 15px rgba(0, 255, 128, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.2)"}}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                        <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-green-300 flex items-center" 
                            style={{textShadow: "0 0 5px rgba(0, 255, 128, 0.7)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            Search Artist
                        </label>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Find your favorite artists..."
                            className="w-full p-2 md:p-3 text-sm bg-black/60 border border-green-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/80 text-white placeholder-gray-400 transition-all"
                            style={{
                                boxShadow: "0 0 8px rgba(0, 255, 128, 0.2)",
                                backdropFilter: "blur(4px)"
                            }}
                        />
                        {/* Electric glow effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                    </div>

                    <div className="relative">
                        <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-purple-300 flex items-center" 
                            style={{textShadow: "0 0 5px rgba(128, 0, 255, 0.7)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            Artist Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 md:p-3 text-sm bg-black/60 border border-purple-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/80 text-white transition-all"
                            style={{
                                boxShadow: "0 0 8px rgba(128, 0, 255, 0.2)",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="Headliner">Headliners</option>
                            <option value="Featured Artists">Featured Artists</option>
                            <option value="Supporting Artists">Supporting Artists</option>
                        </select>
                        {/* Electric glow effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                    </div>

                    <div className="relative sm:col-span-2 lg:col-span-1">
                        <label className="block text-xs md:text-sm font-semibold mb-1 md:mb-2 text-blue-300 flex items-center" 
                            style={{textShadow: "0 0 5px rgba(0, 128, 255, 0.7)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Performance Day
                        </label>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full p-2 md:p-3 text-sm bg-black/60 border border-blue-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/80 text-white transition-all"
                            style={{
                                boxShadow: "0 0 8px rgba(0, 128, 255, 0.2)",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            {days.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        {/* Electric glow effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                    </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-cyan-500/20">
                    <label className="block text-xs md:text-sm font-semibold mb-2 text-yellow-300 flex items-center" 
                        style={{textShadow: "0 0 5px rgba(255, 200, 0, 0.7)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                        Music Service Links
                    </label>
                    <div className="flex items-center gap-3 md:gap-5 flex-wrap">
                        <label className="flex items-center cursor-pointer group transition-all">
                            <span className="relative w-4 h-4 md:w-5 md:h-5 mr-2 border border-green-400/70 rounded-full flex items-center justify-center group-hover:border-green-400 transition-all">
                                <input
                                    type="radio"
                                    name="musicService"
                                    value="spotify"
                                    checked={musicService === "spotify"}
                                    onChange={() => setMusicService("spotify")}
                                    className="absolute opacity-0"
                                />
                                {musicService === "spotify" && (
                                    <span className="block w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full" 
                                          style={{boxShadow: "0 0 5px rgba(0, 255, 128, 0.8)"}}></span>
                                )}
                            </span>
                            <span className="text-xs md:text-sm text-green-300 group-hover:text-green-200 transition-colors">Spotify</span>
                        </label>
                        <label className="flex items-center cursor-pointer group transition-all">
                            <span className="relative w-4 h-4 md:w-5 md:h-5 mr-2 border border-red-400/70 rounded-full flex items-center justify-center group-hover:border-red-400 transition-all">
                                <input
                                    type="radio"
                                    name="musicService"
                                    value="youtube"
                                    checked={musicService === "youtube"}
                                    onChange={() => setMusicService("youtube")}
                                    className="absolute opacity-0"
                                />
                                {musicService === "youtube" && (
                                    <span className="block w-2 h-2 md:w-3 md:h-3 bg-red-400 rounded-full"
                                          style={{boxShadow: "0 0 5px rgba(255, 100, 100, 0.8)"}}></span>
                                )}
                            </span>
                            <span className="text-xs md:text-sm text-red-300 group-hover:text-red-200 transition-colors">YouTube</span>
                        </label>
                        <label className="flex items-center cursor-pointer group transition-all">
                            <span className="relative w-4 h-4 md:w-5 md:h-5 mr-2 border border-gray-400/70 rounded-full flex items-center justify-center group-hover:border-gray-400 transition-all">
                                <input
                                    type="radio"
                                    name="musicService"
                                    value="none"
                                    checked={musicService === "none"}
                                    onChange={() => setMusicService("none")}
                                    className="absolute opacity-0"
                                />
                                {musicService === "none" && (
                                    <span className="block w-2 h-2 md:w-3 md:h-3 bg-gray-400 rounded-full"></span>
                                )}
                            </span>
                            <span className="text-xs md:text-sm text-gray-300 group-hover:text-gray-200 transition-colors">None</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};