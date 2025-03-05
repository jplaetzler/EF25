import React from 'react';

interface PlaylistModalProps {
    isCreatingPlaylist: boolean;
    setShowPlaylistModal: (show: boolean) => void;
    playlistName: string;
    setPlaylistName: (name: string) => void;
    selectedCount: number;
    createPlaylist: () => void;
    musicService: string;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({
    isCreatingPlaylist,
    setShowPlaylistModal,
    playlistName,
    setPlaylistName,
    selectedCount,
    createPlaylist,
    musicService
}) => {
    // Handle backdrop click (close modal if not creating playlist)
    const handleBackdropClick = () => {
        if (!isCreatingPlaylist) {
            setShowPlaylistModal(false);
        }
    };

    // Prevent clicks inside the modal from closing it
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-gray-900 p-6 rounded-lg max-w-md w-full border border-purple-400/30"
                style={{boxShadow: "0 0 30px rgba(128, 0, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)"}}
                onClick={handleModalClick}
            >
                <h3 className="text-xl font-bold mb-4 text-white">
                    Create {musicService === "spotify" ? "Spotify" : "YouTube Music"} Radio
                </h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-green-300">
                        Playlist Name
                    </label>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="w-full p-2 bg-black/60 border border-green-400/50 rounded focus:outline-none focus:ring-2 focus:ring-green-500/80 text-white"
                        disabled={isCreatingPlaylist}
                    />
                </div>

                <p className="text-gray-300 mb-4">
                    Creating a radio with tracks from {selectedCount} selected artists.
                </p>

                <div className="flex space-x-3">
                    <button
                        onClick={createPlaylist}
                        disabled={isCreatingPlaylist}
                        className={`flex-1 py-2 rounded-lg text-white font-medium ${
                            isCreatingPlaylist
                                ? "bg-gray-700"
                                : musicService === "spotify"
                                    ? "bg-gradient-to-r from-green-700 to-blue-700 hover:from-green-600 hover:to-blue-600"
                                    : "bg-gradient-to-r from-red-700 to-purple-700 hover:from-red-600 hover:to-purple-600"
                        }`}
                    >
                        {isCreatingPlaylist ? "Creating..." : "Create Radio"}
                    </button>
                    <button
                        onClick={() => !isCreatingPlaylist && setShowPlaylistModal(false)}
                        disabled={isCreatingPlaylist}
                        className="py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};