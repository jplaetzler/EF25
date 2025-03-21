import React, { useState, useEffect } from 'react';
import {ArtistData} from '../types/lineup-types';

// Create styles for the tabs
const tabContainerStyle = {
    margin: '20px 2.5vw',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    width: '90vw'
};

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
    // State to track window width for responsive design
    const [tabWidth, setTabWidth] = useState<string>('calc(90vw / 5 - 10px)');

    // Update tab width when window resizes
    useEffect(() => {
        // Function to calculate and set tab width
        const calculateTabWidth = () => {
            // Default is 5 tabs per row (desktop)
            let tabsPerRow = 5;
            
            if (window.innerWidth <= 480) {
                // Mobile: 2 tabs per row
                tabsPerRow = 2;
            } else if (window.innerWidth <= 768) {
                // Tablet: 3 tabs per row
                tabsPerRow = 3;
            }
            
            setTabWidth(`calc(90vw / ${tabsPerRow} - 10px)`);
        };

        // Initial calculation
        calculateTabWidth();

        // Add event listener for window resize
        window.addEventListener('resize', calculateTabWidth);

        // Clean up
        return () => window.removeEventListener('resize', calculateTabWidth);
    }, []);
    const tabs = [
        {id: "all", label: "All", emoji: "🫶"},
        {id: "none", label: "Hidden Grove", emoji: "🦉"},
        {id: "electric-magic", label: "Electric Magic", emoji: "⚡"},
        {id: "forest-whisper", label: "Forest Whisper", emoji: "🌳"},
        {id: "passing-breeze", label: "Passing Breeze", emoji: "🍂"}
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
        <div style={tabContainerStyle}>
            {tabs.map((tab, index) => {
                // Define colors for each tab
                let tabColor, bgColor, borderColor, textShadow;

                switch (tab.id) {
                    case "electric-magic":
                        tabColor = '#00FFFF';
                        bgColor = activeTab === tab.id ? 
                            `linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 150, 255, 0.2))` : 
                            `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 30, 60, 0.5))`;
                        borderColor = activeTab === tab.id ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 255, 0.3)';
                        textShadow = activeTab === tab.id ? '0 0 8px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.4)' : '0 0 3px rgba(0, 255, 255, 0.2)';
                        break;
                    case "forest-whisper":
                        tabColor = '#00FF80';
                        bgColor = activeTab === tab.id ? 
                            `linear-gradient(135deg, rgba(0, 255, 128, 0.3), rgba(0, 150, 100, 0.2))` : 
                            `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 40, 20, 0.5))`;
                        borderColor = activeTab === tab.id ? 'rgba(0, 255, 128, 0.5)' : 'rgba(0, 255, 128, 0.3)';
                        textShadow = activeTab === tab.id ? '0 0 8px rgba(0, 255, 128, 0.7), 0 0 15px rgba(0, 255, 128, 0.4)' : '0 0 3px rgba(0, 255, 128, 0.2)';
                        break;
                    case "passing-breeze":
                        tabColor = '#8A2BE2';
                        bgColor = activeTab === tab.id ? 
                            `linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(100, 30, 180, 0.2))` : 
                            `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 0, 50, 0.5))`;
                        borderColor = activeTab === tab.id ? 'rgba(138, 43, 226, 0.5)' : 'rgba(138, 43, 226, 0.3)';
                        textShadow = activeTab === tab.id ? '0 0 8px rgba(138, 43, 226, 0.7), 0 0 15px rgba(138, 43, 226, 0.4)' : '0 0 3px rgba(138, 43, 226, 0.2)';
                        break;
                    case "none":
                        tabColor = '#cccccc';
                        bgColor = activeTab === tab.id ? 
                            `linear-gradient(135deg, rgba(204, 204, 204, 0.3), rgba(150, 150, 150, 0.2))` : 
                            `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 30, 30, 0.5))`;
                        borderColor = activeTab === tab.id ? 'rgba(204, 204, 204, 0.5)' : 'rgba(204, 204, 204, 0.3)';
                        textShadow = activeTab === tab.id ? '0 0 8px rgba(204, 204, 204, 0.7), 0 0 15px rgba(204, 204, 204, 0.4)' : '0 0 3px rgba(204, 204, 204, 0.2)';
                        break;
                    default: // "all"
                        tabColor = 'white';
                        bgColor = activeTab === tab.id ? 
                            `linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(200, 200, 200, 0.2))` : 
                            `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 30, 30, 0.5))`;
                        borderColor = activeTab === tab.id ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)';
                        textShadow = activeTab === tab.id ? '0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)' : '0 0 3px rgba(255, 255, 255, 0.2)';
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
                            borderRadius: '6px 18px 6px 18px', // Asymmetric corners for organic feel
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            textShadow: textShadow,
                            transition: 'all 0.2s ease',
                            flex: '1 1 auto',
                            width: tabWidth,
                            minWidth: '170px', // Ensure minimum width to fit content
                            maxWidth: '220px',
                            boxShadow: activeTab === tab.id ? `0 0 10px ${borderColor}, inset 0 0 8px ${borderColor}` : 'none',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            clipPath: 'polygon(0% 15%, 3% 3%, 15% 0%, 85% 0%, 97% 3%, 100% 15%, 100% 85%, 97% 97%, 85% 100%, 15% 100%, 3% 97%, 0% 85%)', // Organic shape
                            WebkitClipPath: 'polygon(0% 15%, 3% 3%, 15% 0%, 85% 0%, 97% 3%, 100% 15%, 100% 85%, 97% 97%, 85% 100%, 15% 100%, 3% 97%, 0% 85%)',
                            margin: '2px'
                        }}
                    >
                        <span style={{flex: '1', textAlign: 'center', padding: '0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <span style={{fontSize: '1rem'}}>{tab.emoji}</span> {tab.label}
                        </span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            marginRight: '12px',
                        }}>
                            <div style={{
                                width: '1px',
                                height: '18px', 
                                background: `linear-gradient(to bottom, transparent, ${borderColor} 30%, ${borderColor} 70%, transparent)`,
                                margin: '0 8px',
                                opacity: 0.8
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