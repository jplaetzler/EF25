import React, {useState, useRef, useEffect} from 'react';
import {artists as allArtists} from '../data/artists';
import MusicServiceButtons from './MusicServiceButtons';
import ExportSelectedArtists from './ExportSelectedArtists';
import {
    saveToLocalStorage,
    loadFromLocalStorage,
    STORAGE_KEYS
} from '../utils/localStorage';

const ElectricForestLineup: React.FC = () => {
    useRef<HTMLTextAreaElement>(null);

    // Load initial state from localStorage or use defaults
    const [selectedArtists, setSelectedArtists] = useState<Record<string, boolean>>(() =>
        loadFromLocalStorage(STORAGE_KEYS.SELECTED_ARTISTS, {})
    );

    const [filter, setFilter] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.FILTER, "")
    );

    const [category, setCategory] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.CATEGORY, "All")
    );

    const [day, setDay] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.DAY, "All")
    );

    const [sortBy, setSortBy] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.SORT_BY, "category")
    );

    const [sortDirection, setSortDirection] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.SORT_DIRECTION, "asc")
    );

    // Save state to localStorage whenever it changes
    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.SELECTED_ARTISTS, selectedArtists);
    }, [selectedArtists]);

    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.FILTER, filter);
    }, [filter]);

    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.CATEGORY, category);
    }, [category]);

    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.DAY, day);
    }, [day]);

    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.SORT_BY, sortBy);
    }, [sortBy]);

    useEffect(() => {
        saveToLocalStorage(STORAGE_KEYS.SORT_DIRECTION, sortDirection);
    }, [sortDirection]);

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
            // Custom category order: Headliner, Featured Artists, Supporting Artists
            const categoryOrder: Record<string, number> = {
                "Headliner": 0,
                "Featured Artists": 1,
                "Supporting Artists": 2
            };
            comparison = (categoryOrder[a.category] ?? 999) - (categoryOrder[b.category] ?? 999);
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
    const handleSort = (column: string): void => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    // Get unique days for filtering
    const days = ["All", ...Array.from(new Set(allArtists.map(artist => artist.day).filter(day => day !== "")))];

    // Toggle selection of an artist
    const toggleArtistSelection = (artistName: string): void => {
        setSelectedArtists(prev => ({
            ...prev,
            [artistName]: !prev[artistName]
        }));
    };

    // Select/deselect all visible artists
    const toggleAllArtists = (): void => {
        const someSelected = sortedArtists.some(artist => selectedArtists[artist.name]);
        if (someSelected) {
            setSelectedArtists({});
        } else {
            const newSelected: Record<string, boolean> = {};
            sortedArtists.forEach(artist => {
                newSelected[artist.name] = true;
            });
            setSelectedArtists(newSelected);
        }
    };

    // Count selected artists
    const selectedCount = Object.values(selectedArtists).filter(Boolean).length;

    // Function to reset all filters and selections
    const resetAll = () => {
        setFilter("");
        setCategory("All");
        setDay("All");
        setSortBy("category");
        setSortDirection("asc");
    };

    return (
        <div className="min-h-screen"
             style={{
                 backgroundColor: '#071507',
                 backgroundImage: `
             radial-gradient(circle at 20% 30%, rgba(0, 255, 170, 0.05) 0%, transparent 40%),
             radial-gradient(circle at 80% 60%, rgba(128, 0, 255, 0.05) 0%, transparent 40%),
             radial-gradient(circle at 60% 10%, rgba(0, 128, 255, 0.05) 0%, transparent 30%)
           `,
                 color: 'white',
                 position: 'relative',
                 minWidth: '570px'
             }}>

            {/* Firefly effect elements */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'fixed',
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        borderRadius: '50%',
                        backgroundColor: i % 3 === 0 ? '#00ff80' : i % 3 === 1 ? '#8A2BE2' : '#00ffff',
                        boxShadow: i % 3 === 0 ? '0 0 5px #00ff80' : i % 3 === 1 ? '0 0 5px #8A2BE2' : '0 0 5px #00ffff',
                        opacity: 0,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `firefly ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 3}s`,
                        zIndex: 1
                    }}
                ></div>
            ))}

            {/* Main content */}
            <div style={{zIndex: 2, minWidth: '570px',maxWidth: '100%'}}>
                {/* Header */}
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <h1 style={{
                        color: '#00FF80',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0, 255, 128, 0.7), 0 0 20px rgba(0, 255, 128, 0.4)'
                    }}>
                        ELECTRIC FOREST
                    </h1>
                    <p style={{color: '#00FF80', marginTop: '5px', textShadow: '0 0 5px rgba(0, 255, 128, 0.5)'}}>
                        JUNE 19-22, 2025 • ROTHBURY, MI
                    </p>
                    <p style={{
                        color: '#00FF80',
                        marginTop: '10px',
                        fontSize: '1.2rem',
                        textShadow: '0 0 5px rgba(0, 255, 128, 0.5)'
                    }}>
                        LINEUP EXPLORER
                    </p>
                </div>

                {/* Controls section - Laid out exactly as in screenshot */}
                <div style={{marginBottom: '20px'}}>
                    <div style={{margin: '10px 2.5vw 10px 2.5vw'}}>
                        <div>Search Artists</div>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Type artist name..."
                            style={{
                                width: '93.5vw',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none',
                                minWidth: '570px',
                            }}
                        />
                    </div>

                    <div style={{margin: '10px 2.5vw 10px 2.5vw'}}>
                        <div>Filter by Day</div>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            style={{
                                width: '95vw',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none',
                                minWidth: '570px',
                            }}
                        >
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{margin: '10px 2.5vw 10px 2.5vw'}}>
                        <div>Filter by Category</div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '95vw',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none',
                                minWidth: '570px'
                            }}
                        >
                            <option value="All">All</option>
                            <option value="Headliner">Headliner</option>
                            <option value="Featured Artists">Featured Artists</option>
                            <option value="Supporting Artists">Supporting Artists</option>
                        </select>
                    </div>

                    {/* Reset button */}
                    <div style={{margin: '10px 2.5vw 10px 2.5vw'}}>
                        <button
                            onClick={resetAll}
                            style={{
                                width: '95vw',
                                padding: '10px',
                                backgroundColor: 'rgba(138, 43, 226, 0.5)',
                                border: '1px solid rgba(138, 43, 226, 0.8)',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                boxShadow: '0 0 5px rgba(138, 43, 226, 0.3)',
                                transition: 'all 0.2s ease',
                                minWidth: '570px',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(138, 43, 226, 0.7)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(138, 43, 226, 0.5)'}
                        >
                            Reset All Filters
                        </button>
                    </div>
                </div>

                <ExportSelectedArtists selectedArtists={selectedArtists} allArtists={allArtists}/>

                {/* Artists section - Matching the screenshot layout */}
                <div style={{minWidth: '570px', width: '95vw', margin: '10px 2.5vw 20px 2.5vw'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }}>
                        <div>Artists ({filteredArtists.length})</div>
                        <div>Selected: {selectedCount}</div>
                    </div>

                    <div style={{
                        border: '1px solid rgba(0, 255, 128, 0.3)',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        boxShadow: '0 0 10px rgba(0, 255, 128, 0.15)'
                    }}>
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                            <tr style={{borderBottom: '1px solid rgba(0, 255, 128, 0.3)'}}>
                                <th style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                    width: '40px'
                                }}>
                                    <input
                                        type="checkbox"
                                        onChange={toggleAllArtists}
                                        checked={sortedArtists.length > 0 && sortedArtists.every(artist => selectedArtists[artist.name])}
                                    />
                                </th>
                                <th
                                    onClick={() => handleSort("name")}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: '#00FF80',
                                        textShadow: '0 0 5px rgba(0, 255, 128, 0.4)'
                                    }}
                                >
                                    ARTIST
                                    {sortBy === "name" && (
                                        <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </th>
                                <th
                                    onClick={() => handleSort("category")}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: '#8A2BE2',
                                        textShadow: '0 0 5px rgba(138, 43, 226, 0.4)'
                                    }}
                                >
                                    CATEGORY
                                    {sortBy === "category" && (
                                        <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </th>
                                <th
                                    onClick={() => handleSort("day")}
                                    style={{
                                        padding: '10px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: '#00BFFF',
                                        textShadow: '0 0 5px rgba(0, 191, 255, 0.4)'
                                    }}
                                >
                                    DAY
                                    {sortBy === "day" && (
                                        <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </th>
                                <th style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                    color: '#FFFF00',
                                    textShadow: '0 0 5px rgba(255, 255, 0, 0.4)'
                                }}>
                                    LISTEN
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedArtists.map((artist, idx) => (
                                <tr key={artist.name}
                                    style={{
                                        backgroundColor: idx % 2 === 0 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)',
                                        borderBottom: '1px solid rgba(0, 255, 128, 0.1)'
                                    }}>
                                    <td style={{padding: '10px'}}>
                                        <input
                                            type="checkbox"
                                            checked={!!selectedArtists[artist.name]}
                                            onChange={() => toggleArtistSelection(artist.name)}
                                        />
                                    </td>
                                    <td style={{
                                        padding: '10px',
                                        color: artist.category === 'Headliner' ? '#00FFFF' : 'white',
                                        fontWeight: artist.category === 'Headliner' ? 'bold' : 'normal',
                                        textShadow: artist.category === 'Headliner' ? '0 0 5px rgba(0, 255, 255, 0.6)' : 'none'
                                    }}>
                                        {artist.name}
                                    </td>
                                    <td style={{padding: '10px'}}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '5px 15px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            textAlign: 'center',
                                            backgroundColor: artist.category === 'Headliner'
                                                ? 'rgba(128, 0, 128, 0.7)' // Darker purple for Headliner
                                                : artist.category === 'Featured Artists'
                                                    ? 'rgba(147, 112, 219, 0.7)' // Medium purple for Featured Artists
                                                    : 'rgba(186, 85, 211, 0.6)', // Lighter purple for Supporting Artists
                                            color: 'white',
                                            boxShadow: artist.category === 'Headliner'
                                                ? '0 0 8px rgba(128, 0, 128, 0.5)'
                                                : artist.category === 'Featured Artists'
                                                    ? '0 0 6px rgba(147, 112, 219, 0.5)'
                                                    : '0 0 5px rgba(186, 85, 211, 0.4)'
                                        }}>
                                            {artist.category}
                                        </span>
                                    </td>
                                    <td style={{padding: '10px'}}>
                                        {artist.day || "TBA"}
                                    </td>
                                    <td style={{padding: '10px'}}>
                                        <MusicServiceButtons
                                            spotifyId={artist.spotifyId}
                                            youtubeId={artist.youtubeId}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes firefly {
                    0% { opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default ElectricForestLineup;