import React, { useState, useRef, useEffect } from 'react';
import { FilterPanel } from './lineup/FilterPanel';
import { ArtistTable } from './lineup/ArtistTable';
import { ColumnSelector } from './lineup/ColumnSelector';
import { ActionButtons } from './lineup/ActionButtons';
import { PlaylistModal } from './lineup/PlaylistModal';
import { LineupHeader } from './lineup/LineupHeader';
import { LineupStats } from './lineup/LineupStats';
import { TextExport } from './lineup/TextExport';
import {  ColumnPreferences } from '../types/lineup-types';
import { artists as allArtists } from '../data/artists';

const ElectricForestLineup = () => {
    const copyRef = useRef(null);

    // Add state for selected artists and column preferences
    const [selectedArtists, setSelectedArtists] = useState<Record<string, boolean>>({});
    const [columnPreferences, setColumnPreferences] = useState<ColumnPreferences>({
        name: true,
        category: true,
        day: true
    });

    // New state for music service preference
    const [musicService, setMusicService] = useState<string>("spotify");

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

    // Function to copy filtered artists to clipboard
    const copyToClipboard = () => {
        // Get selected artists or use filtered list if none selected
        const artistsToCopy = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        // Format the text based on column preferences
        const textToCopy = artistsToCopy.map(artist => {
            let parts = [];
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

    // Function to create a text file for download
    const downloadAsCsv = () => {
        // Get selected artists or use filtered list if none selected
        const artistsToDownload = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        // Create headers based on column preferences
        let headers = [];
        if (columnPreferences.name) headers.push("Artist Name");
        if (columnPreferences.category) headers.push("Category");
        if (columnPreferences.day) headers.push("Day");

        // Add music service ID columns
        if (musicService === "spotify") headers.push("Spotify ID");
        if (musicService === "youtube") headers.push("YouTube ID");

        let csvContent = headers.join(',') + "\n";

        // Add data rows
        csvContent += artistsToDownload.map(artist => {
            let parts = [];
            if (columnPreferences.name) parts.push(`"${artist.name}"`);
            if (columnPreferences.category) parts.push(`"${artist.category}"`);
            if (columnPreferences.day) parts.push(`"${artist.day}"`);

            // Add music service IDs
            if (musicService === "spotify") parts.push(`"${artist.spotifyId || ''}"`);
            if (musicService === "youtube") parts.push(`"${artist.youtubeId || ''}"`);

            return parts.join(',');
        }).join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'electric_forest_2025_lineup.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

    // Toggle column preference
    const toggleColumnPreference = (column: keyof ColumnPreferences) => {
        setColumnPreferences(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    // Count selected artists
    const selectedCount = Object.values(selectedArtists).filter(Boolean).length;

    // Function to open selected artists in Spotify or YouTube
    const openSelectedArtists = () => {
        const selectedArtistsList = sortedArtists.filter(artist => selectedArtists[artist.name]);

        if (selectedArtistsList.length === 0) {
            alert("Please select at least one artist.");
            return;
        }

        // Limit to max 10 windows to avoid browser blocking
        const maxToOpen = 8;
        let openCount = 0;

        if (selectedArtistsList.length > maxToOpen) {
            if (!confirm(`You're about to open ${selectedArtistsList.length} tabs. This may be blocked by your browser. Continue with the first ${maxToOpen}?`)) {
                return;
            }
        }

        selectedArtistsList.forEach(artist => {
            if (openCount >= maxToOpen) return;

            const id = musicService === "spotify" ? artist.spotifyId : artist.youtubeId;
            if (!id) {
                console.log(`No ${musicService} ID for ${artist.name}`);
                return;
            }

            const url = musicService === "spotify"
                ? `https://open.spotify.com/artist/${id}`
                : `https://www.youtube.com/channel/${id}`;

            window.open(url, '_blank');
            openCount++;
        });

        // Update UI if we stopped early
        if (selectedArtistsList.length > maxToOpen) {
            alert(`Opened ${maxToOpen} of ${selectedArtistsList.length} selected artists. Browsers limit how many tabs can be opened at once.`);
        }
    };

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
                let parts = [];
                if (columnPreferences.name) parts.push(artist.name);
                if (columnPreferences.category) parts.push(artist.category);
                if (columnPreferences.day && artist.day) parts.push(artist.day);
                return parts.join(' - ');
            }).join('\n');
        }
    }, [selectedArtists, sortedArtists, columnPreferences]);

    return (
        <div className="p-3 sm:p-4 md:p-6 w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto rounded-lg my-4 md:my-8" style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 0 20px rgba(0, 255, 170, 0.5), 0 0 40px rgba(128, 0, 255, 0.3), inset 0 0 30px rgba(0, 255, 128, 0.05)",
            border: "1px solid rgba(128, 255, 212, 0.5)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Electric glow border effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(45deg, transparent 98%, rgba(0, 255, 170, 0.8) 100%), linear-gradient(135deg, transparent 98%, rgba(128, 0, 255, 0.8) 100%)",
                opacity: "0.5",
                animation: "pulse 3s infinite ease-in-out"
            }}></div>
            <div className="mb-8">
                <LineupHeader />

                <FilterPanel 
                    filter={filter} 
                    setFilter={setFilter}
                    category={category}
                    setCategory={setCategory}
                    day={day}
                    setDay={setDay}
                    days={days}
                    musicService={musicService}
                    setMusicService={setMusicService}
                />
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

            <div className="mt-8">
                <LineupStats 
                    sortedArtists={sortedArtists}
                    allArtists={allArtists}
                    selectedCount={selectedCount}
                />

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                        style={{textShadow: "0 0 5px rgba(0, 255, 170, 0.5)"}}>
                        Export Your Custom Lineup
                    </h3>

                    <ColumnSelector 
                        columnPreferences={columnPreferences}
                        toggleColumnPreference={toggleColumnPreference}
                    />

                    <ActionButtons 
                        selectedCount={selectedCount}
                        copyToClipboard={copyToClipboard}
                        downloadAsCsv={downloadAsCsv}
                        openSelectedArtists={openSelectedArtists}
                        setShowPlaylistModal={setShowPlaylistModal}
                        musicService={musicService}
                    />
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

                <style jsx>{`
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
        </div>
    );
};

export default ElectricForestLineup;