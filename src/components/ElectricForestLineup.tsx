import { useState, useRef, useEffect } from 'react';
import { ArtistTable } from './lineup/ArtistTable';
import { PlaylistModal } from './lineup/PlaylistModal';
import { TextExport } from './lineup/TextExport';
import { ColumnPreferences } from '../types/lineup-types';
import { artists as allArtists } from '../data/artists.tsx';
import { useTheme } from '../theme/hooks/useTheme';
import Shimmer from '../theme/components/Shimmer';
import { LineupHeader } from './lineup/LineupHeader';

const ElectricForestLineup = () => {
    const copyRef = useRef<HTMLTextAreaElement>(null);
    const { getButtonClasses } = useTheme();

    // Add state for selected artists and column preferences
    const [selectedArtists, setSelectedArtists] = useState<Record<string, boolean>>({});
    const [columnPreferences] = useState<ColumnPreferences>({
        name: true,
        category: true,
        day: true
    });

    // New state for music service preference
    const [musicService] = useState<string>("spotify");

    // State for filtering and sorting
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("All");
    const [day, setDay] = useState("All");
    const [sortBy, setSortBy] = useState("category");
    const [sortDirection, setSortDirection] = useState("asc");

    // State for playlist creation
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("Electric Forest 2025 Mix");
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    // Filter artists based on current filters
    const filteredArtists = allArtists.filter(artist => {
        const nameMatch = artist.name.toLowerCase().includes(filter.toLowerCase());
        const categoryMatch = category === "All" || artist.category === category;
        const dayMatch = day === "All" || artist.day === day;
        return nameMatch && categoryMatch && dayMatch;
    });

    // Sort artists based on current sort settings
    const sortedArtists = [...filteredArtists].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            // Sort by category first, then by name
            comparison = a.category.localeCompare(b.category);
            if (comparison === 0) {
                comparison = a.name.localeCompare(b.name);
            }
        } else if (sortBy === "day") {
            const days = ["Thursday", "Friday", "Saturday", "Sunday", "Special", ""];
            comparison = days.indexOf(a.day) - days.indexOf(b.day);
            if (comparison === 0) {
                comparison = a.name.localeCompare(b.name);
            }
        }
        return sortDirection === "asc" ? comparison : -comparison;
    });

    // Handle sort toggle
    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    // Get unique days for filtering
    const days = ["All", ...Array.from(new Set(allArtists.map(artist => artist.day).filter(day => day !== "")))];

    // Note: Removed stats calculation as we're not using this functionality

    // Function to copy filtered artists to clipboard
    const copyToClipboard = () => {
        // Get selected artists or use filtered list if none selected
        const artistsToCopy = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        // Format the text based on column preferences
        const textToCopy = artistsToCopy.map(artist => {
            const parts = [];
            if (columnPreferences.name) parts.push(artist.name);
            if (columnPreferences.category) parts.push(artist.category);
            if (columnPreferences.day && artist.day) parts.push(artist.day);
            return parts.join(' - ');
        }).join('\n');

        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            // Execute copy command
            document.execCommand('copy');
            alert(`${artistsToCopy.length} artists copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        }

        // Clean up
        document.body.removeChild(textarea);
    };

    // Note: removed downloadAsCsv function as it's not used in this version

    // Toggle selection of an artist
    const toggleArtistSelection = (artistName: string) => {
        setSelectedArtists(prev => ({
            ...prev,
            [artistName]: !prev[artistName]
        }));
    };

    // Select/deselect all visible artists
    const toggleAllArtists = () => {
        const someSelected = sortedArtists.some(artist => selectedArtists[artist.name]);

        if (someSelected) {
            // If any selected, clear all selections
            setSelectedArtists({});
        } else {
            // Select all currently filtered artists
            const newSelected: Record<string, boolean> = {};
            sortedArtists.forEach(artist => {
                newSelected[artist.name] = true;
            });
            setSelectedArtists(newSelected);
        }
    };

    // Note: removed toggleColumnPreference function as it's not used in this version

    // Count selected artists
    const selectedCount = Object.values(selectedArtists).filter(Boolean).length;
    
    // Note: removed openSelectedArtists function as it's not used in this version

    // Function to create a playlist (simulation)
    const createPlaylist = () => {
        const selectedArtistsList = sortedArtists.filter(artist => selectedArtists[artist.name]);

        if (selectedArtistsList.length === 0) {
            alert("Please select at least one artist for your playlist.");
            return;
        }

        setIsCreatingPlaylist(true);

        // This would normally connect to the Spotify/YouTube API
        // For now, we'll simulate the process
        setTimeout(() => {
            setIsCreatingPlaylist(false);
            setShowPlaylistModal(false);

            const service = musicService === "spotify" ? "Spotify" : "YouTube Music";
            alert(`Your "${playlistName}" would now be created on ${service} with tracks from ${selectedArtistsList.length} artists!\n\nNote: This is a simulation. To create actual playlists, this app would need to connect to the ${service} API with proper authentication.`);
        }, 2000);
    };

    // Effect to update the hidden textarea content for copying
    useEffect(() => {
        if (copyRef.current) {
            const artistsToShow = Object.keys(selectedArtists).length > 0
                ? sortedArtists.filter(artist => selectedArtists[artist.name])
                : sortedArtists;

            (copyRef.current as HTMLTextAreaElement).value = artistsToShow.map(artist => {
                const parts = [];
                if (columnPreferences.name) parts.push(artist.name);
                if (columnPreferences.category) parts.push(artist.category);
                if (columnPreferences.day && artist.day) parts.push(artist.day);
                return parts.join(' - ');
            }).join('\n');
        }
    }, [selectedArtists, sortedArtists, columnPreferences]);

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* Forest-inspired animated background */}
            <div className="fixed inset-0 z-0 opacity-20">
                <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-transparent to-transparent"></div>
                <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent opacity-50" style={{top: '30%', left: '70%'}}></div>
                <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent opacity-50" style={{top: '70%', left: '20%'}}></div>
                
                {/* Animated circles for firefly effect */}
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.6,
                            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)',
                            animation: `pulse ${Math.random() * 3 + 2}s infinite alternate ease-in-out ${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header with logo */}
                <LineupHeader />

                {/* Main content */}
                <div className="max-w-7xl mx-auto">
                    {/* Filters section */}
                    <Shimmer className="mb-8 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-md p-6 rounded-xl border border-green-500/20 shadow-[0_0_15px_rgba(0,255,128,0.2)]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search filter */}
                            <div>
                                <label className="block text-green-400 mb-2 font-medium">
                                    Search Artists
                                </label>
                                <input 
                                    type="text" 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Type artist name..." 
                                    className="w-full px-4 py-2 bg-black/60 border border-green-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                />
                            </div>
                            
                            {/* Day filter */}
                            <div>
                                <label className="block text-purple-400 mb-2 font-medium">
                                    Filter by Day
                                </label>
                                <select 
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    className="w-full px-4 py-2 bg-black/60 border border-purple-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                >
                                    {days.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Category filter */}
                            <div>
                                <label className="block text-blue-400 mb-2 font-medium">
                                    Filter by Category
                                </label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 bg-black/60 border border-blue-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option value="All">All</option>
                                    <option value="Headliner">Headliner</option>
                                    <option value="Featured Artists">Featured Artists</option>
                                    <option value="Supporting Artists">Supporting Artists</option>
                                </select>
                            </div>
                        </div>
                        
                    </Shimmer>
                    
                    {/* Artist listing */}
                    <Shimmer className="bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(128,0,255,0.2)]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-purple-400">
                                Artists {filteredArtists.length > 0 && `(${filteredArtists.length})`}
                            </h2>
                            
                            <div className="text-sm text-gray-400">
                                Selected: {Object.values(selectedArtists).filter(Boolean).length}
                            </div>
                        </div>
                        
                        <ArtistTable 
                            sortedArtists={sortedArtists}
                            selectedArtists={selectedArtists}
                            toggleArtistSelection={toggleArtistSelection}
                            toggleAllArtists={toggleAllArtists}
                            handleSort={handleSort}
                            sortBy={sortBy}
                            sortDirection={sortDirection}
                            musicService={musicService}
                        />
                    </Shimmer>
                    
                    {/* Action buttons */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Shimmer className="overflow-hidden">
                            <button 
                                onClick={copyToClipboard}
                                className={`${getButtonClasses('primary')} w-full relative overflow-hidden group`}
                                style={{boxShadow: '0 0 15px rgba(0, 255, 128, 0.3)'}}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="absolute w-8 h-32 bg-white/20 -rotate-45 top-0 -left-32 transform group-hover:translate-x-96 transition-transform duration-1000"></div>
                                </div>
                                <span className="relative">
                                    Export Selected Artists
                                </span>
                            </button>
                        </Shimmer>
                        
                        <Shimmer className="overflow-hidden">
                            <button 
                                onClick={() => setShowPlaylistModal(true)}
                                className={`${getButtonClasses('secondary')} w-full relative overflow-hidden group`}
                                style={{boxShadow: '0 0 15px rgba(128, 0, 255, 0.3)'}}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="absolute w-8 h-32 bg-white/20 -rotate-45 top-0 -left-32 transform group-hover:translate-x-96 transition-transform duration-1000"></div>
                                </div>
                                <span className="relative">
                                    Create {musicService === "spotify" ? "Spotify" : "YouTube"} Playlist
                                </span>
                            </button>
                        </Shimmer>
                    </div>

                    <TextExport 
                        copyRef={copyRef}
                        selectedArtists={selectedArtists}
                        sortedArtists={sortedArtists}
                        columnPreferences={columnPreferences}
                    />

                    {showPlaylistModal && (
                        <PlaylistModal 
                            isCreatingPlaylist={isCreatingPlaylist}
                            setShowPlaylistModal={setShowPlaylistModal}
                            playlistName={playlistName}
                            setPlaylistName={setPlaylistName}
                            selectedCount={selectedCount}
                            createPlaylist={createPlaylist}
                            musicService={musicService}
                        />
                    )}
                </div>
            </div>
            
            {/* Footer */}
            <footer className="relative z-10 text-center py-8 mt-12 text-gray-400 text-sm">
                <p>Electric Forest 2025 • Rothbury, MI • June 19-22, 2025</p>
            </footer>
            
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.3; }
                }
                
                @keyframes shimmer {
                    0% {
                        transform: translateY(-100%) translateX(-100%) rotate(-45deg);
                    }
                    50% {
                        transform: translateY(100%) translateX(100%) rotate(-45deg);
                    }
                    100% {
                        transform: translateY(100%) translateX(100%) rotate(-45deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default ElectricForestLineup;