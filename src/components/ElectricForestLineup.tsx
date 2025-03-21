import React, {useState, useRef, useEffect} from 'react';
import {artists as allArtists} from '../data/artists';
import MusicServiceButtons from './MusicServiceButtons';
import ExportSelectedArtists from './ExportSelectedArtists';
import FilterSortPanel from './FilterSortPanel';
import {
    saveToLocalStorage,
    loadFromLocalStorage,
    STORAGE_KEYS, migrateSelectedArtists
} from '../utils/localStorage';
import SelectionTabs from "./selectionsTab.tsx";

const ElectricForestLineup: React.FC = () => {
    useRef<HTMLTextAreaElement>(null);

    // Load initial state from localStorage or use defaults
    const [selectedArtists, setSelectedArtists] = useState<Record<string, string>>(() => {
        // First, try to migrate any existing data
        const migratedData = migrateSelectedArtists();

        // If migration returned data, use it
        if (Object.keys(migratedData).length > 0) {
            return migratedData;
        }

        // Otherwise, load from localStorage as normal
        return loadFromLocalStorage(STORAGE_KEYS.SELECTED_ARTISTS, {});
    });

    const [filter, setFilter] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.FILTER, "")
    );

    const [activeTab, setActiveTab] = useState<string>(() =>
        loadFromLocalStorage(STORAGE_KEYS.ACTIVE_TAB, "all")
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
        saveToLocalStorage(STORAGE_KEYS.ACTIVE_TAB, activeTab);
    }, [activeTab]);

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

    const tabFilteredArtists = sortedArtists.filter(artist => {
        if (activeTab === "all") {
            return true; // Show all artists
        } else if (activeTab === "none") {
            // Show artists that are not selected or have empty string value
            return !selectedArtists[artist.name] || selectedArtists[artist.name] === "";
        } else {
            // Show artists with specific selection status
            return selectedArtists[artist.name] === activeTab;
        }
    });

    // Function to reset all filters and selections
    const resetAll = () => {
        setFilter("");
        setCategory("All");
        setDay("All");
        setSortBy("category"); // Default sort is by category
        setSortDirection("asc");
    };

    // Function to get background color for category badges
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Headliner':
                return {
                    bg: 'rgba(128, 0, 128, 0.7)',
                    shadow: '0 0 8px rgba(128, 0, 128, 0.5)'
                };
            case 'Featured Artists':
                return {
                    bg: 'rgba(147, 112, 219, 0.7)',
                    shadow: '0 0 6px rgba(147, 112, 219, 0.5)'
                };
            default: // Supporting Artists
                return {
                    bg: 'rgba(186, 85, 211, 0.6)',
                    shadow: '0 0 5px rgba(186, 85, 211, 0.4)'
                };
        }
    };

    // Function to get text color and style for artist name based on category
    const getArtistNameStyle = (category: string) => {
        if (category === 'Headliner') {
            return {
                color: '#00FFFF',
                fontWeight: 'bold',
                textShadow: '0 0 5px rgba(0, 255, 255, 0.6)'
            };
        }
        return {
            color: 'white',
            fontWeight: 'normal',
            textShadow: 'none'
        };
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
                 width: '100%', // Use full width
                 maxWidth: '100vw', // Never exceed viewport width
                 overflowX: 'hidden' // Prevent horizontal scrolling
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
            <div style={{
                zIndex: 2,
                width: '100%', // Use full width
                maxWidth: '1400px', // Cap maximum width for very large screens
            }}>
                {/* Header */}
                <div style={{textAlign: 'center', marginBottom: '20px', position: 'relative'}}>
                    <h1 
                        style={{
                            color: '#00FF80',
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px rgba(0, 255, 128, 0.7), 0 0 20px rgba(0, 255, 128, 0.4)',
                            position: 'relative',
                            display: 'inline-block',
                            cursor: 'help'
                        }}
                        onMouseEnter={(e) => {
                            const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                            if (tooltip) tooltip.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                            if (tooltip) tooltip.style.opacity = '0';
                        }}
                    >
                        ELECTRIC FOREST
                    </h1>
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 5px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: '#00FF80',
                        padding: '8px 15px',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0, 255, 128, 0.3)',
                        zIndex: 100,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                        textShadow: '0 0 5px rgba(0, 255, 128, 0.5)',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        width: 'auto'
                    }}>
                        JUNE 19-22, 2025 • ROTHBURY, MI
                    </div>
                    <p style={{color: '#00FF80', marginTop: '5px', textShadow: '0 0 5px rgba(0, 255, 128, 0.5)'}}>
                        LINEUP EXPLORER
                    </p>
                </div>

                {/* Layout container for integrated search and filter */}
                <div style={{margin: '10px 2.5vw'}}>
                    {/* Combined Search Bar with Filter Button */}
                    <div style={{
                        position: 'relative',
                        marginBottom: '15px',
                        width: '95%',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Search artists..."
                            style={{
                                width: '100%',
                                padding: '10px 45px 10px 35px', // Add padding for icon and filter button
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(0, 255, 128, 0.3)',
                                color: 'white',
                                boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                appearance: 'none',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontSize: '0.95rem',
                            }}
                        />
                        {/* Filter Button positioned inside search input */}
                        <div style={{
                            position: 'absolute',
                            right: '7px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}>
                            <FilterSortPanel
                                filter={filter}
                                setFilter={setFilter}
                                day={day}
                                setDay={setDay}
                                category={category}
                                setCategory={setCategory}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                sortDirection={sortDirection}
                                setSortDirection={setSortDirection}
                                handleSort={handleSort}
                                resetAll={resetAll}
                                days={days}
                            />
                        </div>
                    </div>
                </div>

                <SelectionTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedArtists={selectedArtists}
                    filteredArtists={sortedArtists}
                />

                {/* Artist Cards Container */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px',
                    paddingBottom: '20px',
                    width: '90vw',
                    margin: '10px 2.5vw 10px 2.5vw'
                }}>
                    {tabFilteredArtists.map((artist) => {
                        const categoryStyle = getCategoryColor(artist.category);
                        const nameStyle = getArtistNameStyle(artist.category);

                        return (
                            <div key={artist.name} style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                borderRadius: '8px',
                                padding: '16px',
                                boxShadow: '0 0 10px rgba(0, 255, 128, 0.15)',
                                border: '1px solid rgba(0, 255, 128, 0.2)',
                                position: 'relative',
                                overflow: 'hidden',
                                minHeight: '160px',
                                boxSizing: 'border-box' // Ensure padding is included in width calculation
                            }}>
                                {/* Top row with name and checkbox */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '14px'
                                }}>
                                    <h3 style={{
                                        margin: '0',
                                        fontSize: '1.2rem',
                                        maxWidth: 'calc(100% - 30px)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        ...nameStyle
                                    }}>
                                        {artist.name}
                                    </h3>

                                    {/* dropdown */}
                                    <select
                                        value={selectedArtists[artist.name] || "none"}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setSelectedArtists(prev => ({
                                                ...prev,
                                                [artist.name]: newValue === "none" ? "" : newValue
                                            }));
                                        }}
                                        style={{
                                            padding: '6px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            border: '1px solid rgba(0, 255, 128, 0.3)',
                                            borderRadius: '4px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                            marginLeft: '10px',
                                            boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'none',
                                            appearance: 'none',
                                            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300FF80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 0.7rem top 50%',
                                            backgroundSize: '0.65rem auto',
                                            paddingRight: '1.5rem'
                                        }}
                                    >
                                        <option value="none" style={{color: '#cccccc'}}>Hidden Grove?</option>
                                        <option value="electric-magic" style={{color: '#00FFFF'}}>Electric Magic</option>
                                        <option value="forest-whisper" style={{color: '#00FF80'}}>Forest Whisper</option>
                                        <option value="passing-breeze" style={{color: '#8A2BE2'}}>Passing Breeze</option>
                                    </select>
                                </div>

                                {/* Bottom content row */}
                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '16px' // Space between columns
                                }}>
                                    {/* Left column - Category and day info */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        flex: '1 1 auto',
                                        minWidth: '0',
                                        maxWidth: '60%'
                                    }}>
                                        {/* Category badge */}
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '5px 15px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            textAlign: 'center',
                                            backgroundColor: categoryStyle.bg,
                                            color: 'white',
                                            boxShadow: categoryStyle.shadow,
                                            alignSelf: 'flex-start',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                            {artist.category}
                        </span>

                                        {/* Day information */}
                                        {artist.day && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                                                          stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span style={{color: '#00BFFF'}}>{artist.day || "TBA"}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right column - Music service buttons */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        width: '100px', // Fixed width
                                        flexShrink: 0, // Don't shrink
                                        boxSizing: 'border-box'
                                    }}>
                                        <MusicServiceButtons
                                            spotifyId={artist.spotifyId}
                                            youtubeId={artist.youtubeId}
                                        />
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    pointerEvents: 'none',
                                    borderRadius: '8px',
                                    transition: 'box-shadow 0.3s ease',
                                    boxShadow: 'inset 0 0 0 rgba(0, 255, 128, 0)'
                                }} className="card-glow"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ExportSelectedArtists selectedArtists={selectedArtists} allArtists={allArtists}/>
            {/* Animations and styles */}
            <style>{`
                @keyframes firefly {
                    0% { opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Card hover effect */
                div:hover > .card-glow {
                    box-shadow: inset 0 0 20px rgba(0, 255, 128, 0.3) !important;
                }
            `}</style>
        </div>
    );
};

export default ElectricForestLineup;