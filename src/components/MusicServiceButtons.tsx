import React from 'react';

interface MusicServiceButtonsProps {
    spotifyId: string;
    youtubeId: string;
}

const MusicServiceButtons: React.FC<MusicServiceButtonsProps> = ({ spotifyId, youtubeId }) => {
    return (
        <>
            {/* Spotify Button */}
            {spotifyId && (
        <a
                href={`https://open.spotify.com/artist/${spotifyId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1DB954',
                color: 'white',
                padding: '5px 8px',
                borderRadius: '500px',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
                lineHeight: '1',
                height: '28px',
                width: '100%',
                boxSizing: 'border-box'
            }}
                >
                <svg style={{ width: '14px', height: '14px', marginRight: '5px', flexShrink: 0 }} viewBox="0 0 16 16" fill="white">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                </svg>
                <span style={{ whiteSpace: 'nowrap' }}>Spotify</span>
</a>
)}

{/* YouTube Button */}
{youtubeId && (
<a
    href={`https://music.youtube.com/channel/${youtubeId}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
    display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000',
        color: 'white',
        padding: '5px 8px',
        borderRadius: '500px',
        fontSize: '13px',
        fontWeight: '500',
        textDecoration: 'none',
        lineHeight: '1',
        height: '28px',
        width: '100%',
        boxSizing: 'border-box'
}}
>
<svg style={{ width: '14px', height: '14px', marginRight: '5px', flexShrink: 0 }} viewBox="0 0 16 16" fill="white">
    <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm3.3 8.37l-4.8 2.8a.5.5 0 0 1-.75-.44V5.27a.5.5 0 0 1 .75-.44l4.8 2.8a.5.5 0 0 1 0 .87z"/>
    </svg>
    <span style={{ whiteSpace: 'nowrap' }}>YouTube</span>
</a>
)}
</>
);
};

export default MusicServiceButtons;