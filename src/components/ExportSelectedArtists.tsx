import React, { useState } from 'react';
import { ArtistData } from '../types/lineup-types';

interface ExportSelectedArtistsProps {
    selectedArtists: Record<string, string>;
    allArtists: ArtistData[];
}

const ExportSelectedArtists: React.FC<ExportSelectedArtistsProps> = ({
                                                                         selectedArtists,
                                                                         allArtists
                                                                     }) => {
    // State for export dropdown
    const [exportMode, setExportMode] = useState<string>("all");

    // Get the list of artists data based on the export mode
    const getArtistsDataForExport = (): ArtistData[] => {
        switch (exportMode) {
            case "all":
                // All artists regardless of selection status
                return [...allArtists];
            case "none":
                // Only uncategorized artists (Hidden Grove)
                return allArtists.filter(artist =>
                    !selectedArtists[artist.name] || selectedArtists[artist.name] === "");
            case "electric-magic":
                return allArtists.filter(artist =>
                    selectedArtists[artist.name] === "electric-magic");
            case "forest-whisper":
                return allArtists.filter(artist =>
                    selectedArtists[artist.name] === "forest-whisper");
            case "passing-breeze":
                return allArtists.filter(artist =>
                    selectedArtists[artist.name] === "passing-breeze");
            default:
                return [];
        }
    };

    // Copy artists to clipboard
    const copyToClipboard = () => {
        const artistsData = getArtistsDataForExport();

        if (artistsData.length === 0) {
            alert('No artists match the selected export criteria');
            return;
        }

        // Create a formatted string with the artists' names
        const artistNames = artistsData.map(artist => artist.name).join(', ');

        navigator.clipboard.writeText(artistNames)
            .then(() => {
                // Show success message
                alert(`${artistsData.length} artists copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            });
    };

    // Download artists as CSV
    const downloadCSV = () => {
        const artistsData = getArtistsDataForExport();

        if (artistsData.length === 0) {
            alert('No artists match the selected export criteria');
            return;
        }

        // Get a descriptive name for the file based on export mode
        let fileNamePrefix = "electric_forest";
        if (exportMode !== "all") {
            const modeLabels: Record<string, string> = {
                "none": "hidden_grove",
                "electric-magic": "electric_magic",
                "forest-whisper": "forest_whisper",
                "passing-breeze": "passing_breeze"
            };
            fileNamePrefix += `_${modeLabels[exportMode] || exportMode}`;
        }

        // Create CSV header and content
        const csvHeader = ['Name', 'Category', 'Day', 'Selection', 'Spotify ID', 'YouTube ID'].join(',');
        const csvRows = artistsData.map(artist => {
            // Get selection category label
            let selectionLabel = "Hidden Grove?";
            switch (selectedArtists[artist.name]) {
                case "electric-magic":
                    selectionLabel = "Electric Magic";
                    break;
                case "forest-whisper":
                    selectionLabel = "Forest Whisper";
                    break;
                case "passing-breeze":
                    selectionLabel = "Passing Breeze";
                    break;
            }

            return [
                // Wrap in quotes to handle commas in names
                `"${artist.name}"`,
                `"${artist.category}"`,
                `"${artist.day || 'TBA'}"`,
                `"${selectionLabel}"`,
                artist.spotifyId,
                artist.youtubeId
            ].join(',');
        });

        const csvContent = [csvHeader, ...csvRows].join('\n');

        // Create a blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Set up and trigger download
        link.setAttribute('href', url);
        link.setAttribute('download', `${fileNamePrefix}_artists.csv`);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Count artists by category
    const counts = {
        all: allArtists.length,
        hidden: allArtists.filter(artist => !selectedArtists[artist.name] || selectedArtists[artist.name] === "").length,
        electricMagic: allArtists.filter(artist => selectedArtists[artist.name] === "electric-magic").length,
        forestWhisper: allArtists.filter(artist => selectedArtists[artist.name] === "forest-whisper").length,
        passingBreeze: allArtists.filter(artist => selectedArtists[artist.name] === "passing-breeze").length
    };

    // Get the count for the current export mode
    const getCurrentCount = () => {
        switch (exportMode) {
            case "all":
                return counts.all;
            case "none":
                return counts.hidden;
            case "electric-magic":
                return counts.electricMagic;
            case "forest-whisper":
                return counts.forestWhisper;
            case "passing-breeze":
                return counts.passingBreeze;
            default:
                return 0;
        }
    };

    const currentCount = getCurrentCount();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: '10px 2.5vw 15px 2.5vw'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#00FF80'
            }}>
                <span>Export artists:</span>
                <select
                    value={exportMode}
                    onChange={(e) => setExportMode(e.target.value)}
                    style={{
                        padding: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        border: '1px solid rgba(0, 255, 128, 0.3)',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: 'pointer',
                        boxShadow: '0 0 5px rgba(0, 255, 128, 0.2)',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300FF80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.7rem top 50%',
                        backgroundSize: '0.65rem auto',
                        paddingRight: '1.5rem'
                    }}
                >
                    <option value="all" style={{color: 'white'}}>
                        All Artists ({counts.all})
                    </option>
                    <option value="none" style={{color: '#cccccc'}}>
                        Hidden Grove? ({counts.hidden})
                    </option>
                    <option value="electric-magic" style={{color: '#00FFFF'}}>
                        Electric Magic ({counts.electricMagic})
                    </option>
                    <option value="forest-whisper" style={{color: '#00FF80'}}>
                        Forest Whisper ({counts.forestWhisper})
                    </option>
                    <option value="passing-breeze" style={{color: '#8A2BE2'}}>
                        Passing Breeze ({counts.passingBreeze})
                    </option>
                </select>
            </div>

            <div style={{
                display: 'flex',
                gap: '10px',
            }}>
                <button
                    onClick={copyToClipboard}
                    disabled={currentCount === 0}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: currentCount > 0 ? 'rgba(0, 255, 128, 0.5)' : 'rgba(100, 100, 100, 0.5)',
                        border: '1px solid rgba(0, 255, 128, 0.8)',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: currentCount > 0 ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9rem',
                        boxShadow: '0 0 5px rgba(0, 255, 128, 0.3)',
                        flex: 1
                    }}
                >
                    {/* Clipboard Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copy {currentCount} artist{currentCount !== 1 ? 's' : ''}
                </button>

                <button
                    onClick={downloadCSV}
                    disabled={currentCount === 0}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: currentCount > 0 ? 'rgba(138, 43, 226, 0.5)' : 'rgba(100, 100, 100, 0.5)',
                        border: '1px solid rgba(138, 43, 226, 0.8)',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: currentCount > 0 ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9rem',
                        boxShadow: '0 0 5px rgba(138, 43, 226, 0.3)',
                        flex: 1
                    }}
                >
                    {/* Download Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download CSV
                </button>
            </div>
        </div>
    );
};

export default ExportSelectedArtists;