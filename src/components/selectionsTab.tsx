import React from 'react';
import {ArtistData} from '../types/lineup-types';

interface SelectionTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedArtists: Record<string, string>;
    filteredArtists: ArtistData[];
}

const SelectionTabs: React.FC<SelectionTabsProps> = ({
                                                         activeTab,
                                                         setActiveTab,
                                                         selectedArtists,
                                                         filteredArtists
                                                     }) => {
    const tabs = [
        {id: "all", label: "All"},
        {id: "none", label: "Hidden Grove"},
        {id: "electric-magic", label: "Electric Magic"},
        {id: "forest-whisper", label: "Forest Whisper"},
        {id: "passing-breeze", label: "Passing Breeze"}
    ];

    // Count artists in each category
    const counts = tabs.map(tab => {
        if (tab.id === "all") {
            return filteredArtists.length;
        } else if (tab.id === "none") {
            return filteredArtists.filter(artist =>
                !selectedArtists[artist.name] || selectedArtists[artist.name] === ""
            ).length;
        } else {
            return filteredArtists.filter(artist =>
                selectedArtists[artist.name] === tab.id
            ).length;
        }
    });

    return (
        <div style={{
            margin: '20px 2.5vw',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            width: '90vw'
        }}>
            {tabs.map((tab, index) => {
                // Define colors for each tab
                let tabColor, bgColor, borderColor, textShadow;

                switch (tab.id) {
                    case "electric-magic":
                        tabColor = '#00FFFF';
                        bgColor = activeTab === tab.id ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.5)';
                        borderColor = 'rgba(0, 255, 255, 0.5)';
                        textShadow = '0 0 5px rgba(0, 255, 255, 0.4)';
                        break;
                    case "forest-whisper":
                        tabColor = '#00FF80';
                        bgColor = activeTab === tab.id ? 'rgba(0, 255, 128, 0.2)' : 'rgba(0, 0, 0, 0.5)';
                        borderColor = 'rgba(0, 255, 128, 0.5)';
                        textShadow = '0 0 5px rgba(0, 255, 128, 0.4)';
                        break;
                    case "passing-breeze":
                        tabColor = '#8A2BE2';
                        bgColor = activeTab === tab.id ? 'rgba(138, 43, 226, 0.2)' : 'rgba(0, 0, 0, 0.5)';
                        borderColor = 'rgba(138, 43, 226, 0.5)';
                        textShadow = '0 0 5px rgba(138, 43, 226, 0.4)';
                        break;
                    case "none":
                        tabColor = '#cccccc';
                        bgColor = activeTab === tab.id ? 'rgba(204, 204, 204, 0.2)' : 'rgba(0, 0, 0, 0.5)';
                        borderColor = 'rgba(204, 204, 204, 0.5)';
                        textShadow = '0 0 5px rgba(204, 204, 204, 0.4)';
                        break;
                    default: // "all"
                        tabColor = 'white';
                        bgColor = activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.5)';
                        borderColor = 'rgba(255, 255, 255, 0.5)';
                        textShadow = '0 0 5px rgba(255, 255, 255, 0.4)';
                }

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: bgColor,
                            color: tabColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            textShadow: textShadow,
                            transition: 'all 0.2s ease',
                            flex: '1 1 auto',
                            minWidth: '120px',
                            maxWidth: '220px',
                            boxShadow: activeTab === tab.id ? `0 0 10px ${borderColor}` : 'none',
                            position: 'relative'
                        }}
                    >
                        {tab.label}
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: tabColor,
                            color: '#000',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            opacity: 0.8
                        }}>
              {counts[index]}
            </span>
                    </button>
                );
            })}
        </div>
    );
};

export default SelectionTabs;