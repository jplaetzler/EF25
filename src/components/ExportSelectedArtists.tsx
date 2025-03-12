import React from 'react';
import { ArtistData } from '../types/lineup-types';

interface ExportSelectedArtistsProps {
    selectedArtists: Record<string, boolean>;
    allArtists: ArtistData[];
}

const ExportSelectedArtists: React.FC<ExportSelectedArtistsProps> = ({
                                                                         selectedArtists,
                                                                         allArtists
                                                                     }) => {
    // Get the list of selected artists data
    const getSelectedArtistsData = (): ArtistData[] => {
        return allArtists.filter(artist => selectedArtists[artist.name]);
    };

    // Copy selected artists to clipboard
    const copyToClipboard = () => {
        const selectedArtistsData = getSelectedArtistsData();

        if (selectedArtistsData.length === 0) {
            alert('Please select at least one artist first');
            return;
        }

        // Create a formatted string with the artists' names
        const artistNames = selectedArtistsData.map(artist => artist.name).join(', ');

        navigator.clipboard.writeText(artistNames)
            .then(() => {
                // Show success message
                alert('Artists copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            });
    };

    // Download selected artists as CSV
    const downloadCSV = () => {
        const selectedArtistsData = getSelectedArtistsData();

        if (selectedArtistsData.length === 0) {
            alert('Please select at least one artist first');
            return;
        }

        // Create CSV header and content
        const csvHeader = ['Name', 'Category', 'Day', 'Spotify ID', 'YouTube ID'].join(',');
        const csvRows = selectedArtistsData.map(artist => {
            return [
                // Wrap in quotes to handle commas in names
                `"${artist.name}"`,
                `"${artist.category}"`,
                `"${artist.day || 'TBA'}"`,
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
        link.setAttribute('download', 'electric_forest_selected_artists.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Count selected artists
    const selectedCount = Object.values(selectedArtists).filter(Boolean).length;

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
        }}>
            <button
                onClick={copyToClipboard}
                disabled={selectedCount === 0}
                style={{
                    padding: '8px 12px',
                    backgroundColor: selectedCount > 0 ? 'rgba(0, 255, 128, 0.5)' : 'rgba(100, 100, 100, 0.5)',
                    border: '1px solid rgba(0, 255, 128, 0.8)',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.9rem',
                    boxShadow: '0 0 5px rgba(0, 255, 128, 0.3)',
                }}
            >
                {/* Clipboard Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy {selectedCount} artist{selectedCount !== 1 ? 's' : ''}
            </button>

            <button
                onClick={downloadCSV}
                disabled={selectedCount === 0}
                style={{
                    padding: '8px 12px',
                    backgroundColor: selectedCount > 0 ? 'rgba(138, 43, 226, 0.5)' : 'rgba(100, 100, 100, 0.5)',
                    border: '1px solid rgba(138, 43, 226, 0.8)',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.9rem',
                    boxShadow: '0 0 5px rgba(138, 43, 226, 0.3)',
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
    );
};

export default ExportSelectedArtists;