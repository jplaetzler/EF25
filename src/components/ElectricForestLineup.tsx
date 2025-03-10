import React, { useState, useRef } from 'react';
import { artists as allArtists } from '../data/artists';

const ElectricForestLineup: React.FC = () => {
    useRef<HTMLTextAreaElement>(null);
// State for artist selection and column preferences
    const [selectedArtists, setSelectedArtists] = useState<Record<string, boolean>>({});
// State for filtering and sorting
    const [filter, setFilter] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [day, setDay] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("category");
    const [sortDirection, setSortDirection] = useState<string>("asc");

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
                 position: 'relative'
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
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 style={{
                        color: '#00FF80',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0, 255, 128, 0.7), 0 0 20px rgba(0, 255, 128, 0.4)'
                    }}>
                        ELECTRIC FOREST
                    </h1>
                    <p style={{ color: '#00FF80', marginTop: '5px', textShadow: '0 0 5px rgba(0, 255, 128, 0.5)' }}>
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
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <div>Search Artists</div>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Type artist name..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <div>Filter by Day</div>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none'
                            }}
                        >
                            {days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <div>Filter by Category</div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none'
                            }}
                        >
                            <option value="All">All</option>
                            <option value="Headliner">Headliner</option>
                            <option value="Featured Artists">Featured Artists</option>
                            <option value="Supporting Artists">Supporting Artists</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <div>Music Service Links</div>
                        <div style={{
                            padding: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(0, 255, 128, 0.3)',
                            color: 'white',
                            boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)'
                        }}>
                            Spotify•YouTube
                        </div>
                    </div>
                </div>

                {/* Artists section - Matching the screenshot layout */}
                <div style={{ marginBottom: '20px' }}>
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
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr style={{ borderBottom: '1px solid rgba(0, 255, 128, 0.3)' }}>
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
                                    <td style={{ padding: '10px' }}>
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
                                    <td style={{ padding: '10px' }}>
                      <span style={{
                          display: 'inline-block',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          textAlign: 'center',
                          backgroundColor: 'rgba(138, 43, 226, 0.6)',
                          color: 'white',
                          boxShadow: '0 0 5px rgba(138, 43, 226, 0.4)'
                      }}>
                        {artist.category}
                      </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        {artist.day || "TBA"}
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <a
                                            href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-block',
                                                padding: '5px 15px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                backgroundColor: 'rgba(0, 128, 0, 0.7)',
                                                color: 'white',
                                                textDecoration: 'none',
                                                boxShadow: '0 0 5px rgba(0, 128, 0, 0.4)'
                                            }}
                                        >
                                            Spotify
                                        </a>
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