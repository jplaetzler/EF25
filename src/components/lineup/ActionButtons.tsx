import React from 'react';

interface ActionButtonsProps {
    selectedCount: number;
    copyToClipboard: () => void;
    downloadAsCsv: () => void;
    openSelectedArtists: () => void;
    setShowPlaylistModal: (show: boolean) => void;
    musicService: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    selectedCount,
    copyToClipboard,
    downloadAsCsv,
    openSelectedArtists,
    setShowPlaylistModal,
    musicService
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-lg font-medium transition-all hover:from-blue-700 hover:to-purple-700 relative overflow-hidden"
                style={{
                    boxShadow: "0 0 15px rgba(128, 0, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2)",
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full absolute opacity-20">
                        <div className="absolute w-8 h-32 bg-white/30 -rotate-45"
                            style={{
                                filter: "blur(8px)",
                                animation: "shimmer 3s infinite",
                                left: "30%",
                                top: "-100%"
                            }}></div>
                    </div>
                </div>
                <span className="relative">
                    {selectedCount > 0 ? `Copy ${selectedCount} Selected Artists` : "Copy All Filtered Artists"}
                </span>
            </button>
            
            <button
                onClick={downloadAsCsv}
                className="px-4 py-3 bg-gradient-to-r from-green-800 to-teal-800 text-white rounded-lg font-medium transition-all hover:from-green-700 hover:to-teal-700 relative overflow-hidden"
                style={{
                    boxShadow: "0 0 15px rgba(0, 255, 170, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2)",
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full absolute opacity-20">
                        <div className="absolute w-8 h-32 bg-white/30 -rotate-45"
                            style={{
                                filter: "blur(8px)",
                                animation: "shimmer 3s infinite",
                                left: "30%",
                                top: "-100%"
                            }}></div>
                    </div>
                </div>
                <span className="relative">
                    {selectedCount > 0 ? `Download ${selectedCount} Selected (CSV)` : "Download Filtered List (CSV)"}
                </span>
            </button>

            {musicService !== "none" && (
                <>
                    <button
                        onClick={openSelectedArtists}
                        className={`px-4 py-3 text-white rounded-lg font-medium transition-all relative overflow-hidden
                            ${musicService === "spotify"
                                ? "bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800"
                                : "bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800"}`}
                        style={{
                            boxShadow: musicService === "spotify"
                                ? "0 0 15px rgba(0, 255, 128, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2)"
                                : "0 0 15px rgba(255, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)",
                            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full absolute opacity-20">
                                <div className="absolute w-8 h-32 bg-white/30 -rotate-45"
                                    style={{
                                        filter: "blur(8px)",
                                        animation: "shimmer 3s infinite",
                                        left: "30%",
                                        top: "-100%"
                                    }}></div>
                            </div>
                        </div>
                        <span className="relative">
                            {selectedCount > 0
                                ? `Open ${selectedCount} Selected Artists`
                                : `Select Artists to Open`}
                        </span>
                    </button>

                    <button
                        onClick={() => selectedCount > 0 ? setShowPlaylistModal(true) : alert("Please select at least one artist.")}
                        className={`px-4 py-3 text-white rounded-lg font-medium transition-all relative overflow-hidden
                            ${musicService === "spotify"
                                ? "bg-gradient-to-r from-green-900 to-blue-900 hover:from-green-800 hover:to-blue-800"
                                : "bg-gradient-to-r from-red-900 to-purple-900 hover:from-red-800 hover:to-purple-800"}`}
                        style={{
                            boxShadow: musicService === "spotify"
                                ? "0 0 15px rgba(0, 255, 128, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2)"
                                : "0 0 15px rgba(255, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)",
                            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full absolute opacity-20">
                                <div className="absolute w-8 h-32 bg-white/30 -rotate-45"
                                    style={{
                                        filter: "blur(8px)",
                                        animation: "shimmer 3s infinite",
                                        left: "30%",
                                        top: "-100%"
                                    }}></div>
                            </div>
                        </div>
                        <span className="relative">
                            {selectedCount > 0
                                ? `Create Radio with ${selectedCount} Artists`
                                : `Select Artists for Radio`}
                        </span>
                    </button>
                </>
            )}
        </div>
    );
};