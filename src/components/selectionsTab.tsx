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
        {id: "none", label: "Hidden Grove?"},
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
                            padding: '10px 0',
                            backgroundColor: bgColor,
                            color: tabColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            textShadow: textShadow,
                            transition: 'all 0.2s ease',
                            flex: '1 1 auto',
                            minWidth: '150px',
                            maxWidth: '220px',
                            boxShadow: activeTab === tab.id ? `0 0 10px ${borderColor}` : 'none',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <span style={{flex: '1', textAlign: 'center', padding: '0 5px'}}>
                            {tab.label}
                        </span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            marginRight: '12px',
                        }}>
                            <div style={{
                                width: '1px',
                                height: '15px',
                                backgroundColor: borderColor,
                                margin: '0 8px',
                                opacity: 0.7
                            }}></div>
                            <span style={{
                                color: tabColor,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                minWidth: '20px',
                                textAlign: 'center'
                            }}>
                                {counts[index]}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default SelectionTabs;