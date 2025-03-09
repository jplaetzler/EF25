// scripts/updateArtistIds.js
import fs from 'fs';
import path from 'path';
import https from 'https';
import querystring from 'querystring';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import inquirer from 'inquirer';

// Load environment variables
dotenv.config();

// Get file directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path for the artists data
const ARTISTS_FILE_PATH = path.join(__dirname, '../src/data/artists.tsx');

// Get API credentials from environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Helper function to make HTTPS requests
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    if (responseData.trim() === '') {
                        resolve({});
                    } else {
                        resolve(JSON.parse(responseData));
                    }
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(data);
        }

        req.end();
    });
}

// Get Spotify access token
async function getSpotifyAccessToken() {
    console.log('Getting Spotify access token...');

    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const data = querystring.stringify({
        grant_type: 'client_credentials'
    });

    try {
        const response = await makeRequest(options, data);
        console.log('✓ Spotify token obtained');
        return response.access_token;
    } catch (error) {
        console.error('× Error getting Spotify access token:', error.message);
        return null;
    }
}

// Search for artist on Spotify
async function searchSpotifyArtist(artistName, accessToken) {
    console.log(`  - Searching Spotify for "${artistName}"`);

    const options = {
        hostname: 'api.spotify.com',
        path: `/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await makeRequest(options);

        if (response.artists && response.artists.items && response.artists.items.length > 0) {
            const artist = response.artists.items[0];
            console.log(`    ✓ Found: ${artist.name} (${artist.id})`);
            return artist.id;
        } else {
            console.log(`    × No matching artist found on Spotify`);
            return null;
        }
    } catch (error) {
        console.error(`    × Error searching Spotify:`, error.message);
        return null;
    }
}

// Search for artist on YouTube with priority for YouTube Music integration
async function searchYoutubeArtist(artistName) {
    console.log(`  - Searching YouTube for "${artistName}" (prioritizing YouTube Music compatibility)`);

    // First try searching for the "Topic" channel which works best with YouTube Music
    const topicQuery = encodeURIComponent(`${artistName} - Topic`);
    const options = {
        hostname: 'www.googleapis.com',
        path: `/youtube/v3/search?part=snippet&q=${topicQuery}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`,
        method: 'GET'
    };

    try {
        const response = await makeRequest(options);

        if (response.items && response.items.length > 0) {
            const channelId = response.items[0].snippet.channelId;
            const channelTitle = response.items[0].snippet.title;

            if (channelTitle.includes("Topic")) {
                console.log(`    ✓ Found Topic channel (ideal for YouTube Music): ${channelTitle} (${channelId})`);
                return channelId;
            }
        }

        // If no Topic channel found, try a general search
        const generalOptions = {
            hostname: 'www.googleapis.com',
            path: `/youtube/v3/search?part=snippet&q=${encodeURIComponent(artistName + " official")}&type=channel&maxResults=3&key=${YOUTUBE_API_KEY}`,
            method: 'GET'
        };

        const generalResponse = await makeRequest(generalOptions);

        if (generalResponse.items && generalResponse.items.length > 0) {
            const channelId = generalResponse.items[0].snippet.channelId;
            console.log(`    ✓ Found channel: ${generalResponse.items[0].snippet.title} (${channelId})`);
            return channelId;
        } else {
            console.log(`    × No matching channel found on YouTube`);
            return null;
        }
    } catch (error) {
        console.error(`    × Error searching YouTube:`, error.message);
        return null;
    }
}

// Parse artists from TypeScript file
function parseArtistsFile() {
    try {
        const fileContent = fs.readFileSync(ARTISTS_FILE_PATH, 'utf8');

        // Extract artists array
        const regex = /export const artists: ArtistData\[\] = \[([\s\S]*?)\];/;
        const match = fileContent.match(regex);

        if (!match) {
            throw new Error('Could not find artists array in file');
        }

        const artistsText = match[1].trim();

        // Parse artists using regex (a simple approach)
        const artists = [];
        const artistRegex = /{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?day:\s*"([^"]*)"[\s\S]*?spotifyId:\s*"([^"]*)"[\s\S]*?youtubeId:\s*"([^"]*)"/g;

        let artistMatch;
        while ((artistMatch = artistRegex.exec(artistsText)) !== null) {
            artists.push({
                name: artistMatch[1],
                category: artistMatch[2],
                day: artistMatch[3],
                spotifyId: artistMatch[4],
                youtubeId: artistMatch[5]
            });
        }

        return { artists, fileContent };
    } catch (error) {
        console.error('Error parsing artists file:', error.message);
        process.exit(1);
    }
}

// Write updated artists back to the file
function writeArtistsFile(artists, fileContent) {
    try {
        // Format artists array as string
        const artistsString = artists.map(artist => {
            return `  { name: "${artist.name}", category: "${artist.category}", day: "${artist.day}", spotifyId: "${artist.spotifyId}", youtubeId: "${artist.youtubeId}" }`;
        }).join(',\n');

        // Replace existing artists array with new one
        const newContent = fileContent.replace(
            /export const artists: ArtistData\[\] = \[([\s\S]*?)\];/,
            `export const artists: ArtistData[] = [\n${artistsString}\n];`
        );

        fs.writeFileSync(ARTISTS_FILE_PATH, newContent);
        console.log('\n✓ Artists file updated successfully');
    } catch (error) {
        console.error('\n× Error writing to artists file:', error.message);
    }
}

// Main function to update artist IDs
async function updateArtistIds() {
    console.log('🎵 Artist ID Update Script');
    console.log('=========================\n');

    // Check for missing API credentials
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
        console.log('⚠️  Warning: Spotify API credentials not set. Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env file.');
    }

    if (!YOUTUBE_API_KEY) {
        console.log('⚠️  Warning: YouTube API key not set. Please add YOUTUBE_API_KEY to your .env file.');
    }

    // Parse artists file
    const { artists, fileContent } = parseArtistsFile();
    console.log(`Found ${artists.length} artists in the data file\n`);

    // Interactive questions using inquirer
    try {
        // Choose which service to update
        const { service } = await inquirer.prompt([
            {
                type: 'list',
                name: 'service',
                message: 'Which service would you like to update?',
                choices: [
                    { name: 'Spotify', value: 'spotify' },
                    { name: 'YouTube Music', value: 'youtube' },
                    { name: 'Both services', value: 'both' }
                ]
            }
        ]);

        const updateSpotify = (service === 'spotify' || service === 'both');
        const updateYoutube = (service === 'youtube' || service === 'both');

        // Get Spotify token if needed
        let spotifyToken = null;
        if (updateSpotify) {
            spotifyToken = await getSpotifyAccessToken();
            if (!spotifyToken) {
                console.log('Cannot update Spotify IDs without a valid token.');
                if (service === 'spotify') {
                    return;
                }
            }
        }

        // Choose update mode
        const { updateMode } = await inquirer.prompt([
            {
                type: 'list',
                name: 'updateMode',
                message: 'Which artist IDs would you like to update?',
                choices: [
                    { name: 'All artists (overwrite existing IDs)', value: 'all' },
                    { name: 'Only artists with missing or placeholder IDs', value: 'missing' }
                ]
            }
        ]);

        const updateAll = updateMode === 'all';

        // Count statistics
        const missingSpotifyIds = artists.filter(a => !a.spotifyId || a.spotifyId === '0TnOYISbd1XYRBk9myaseg').length;
        const missingYoutubeIds = artists.filter(a => !a.youtubeId || a.youtubeId.includes('UC-Example')).length;

        console.log('\nArtist ID statistics:');
        if (updateSpotify) {
            console.log(`- Spotify: ${artists.length - missingSpotifyIds} artists have IDs, ${missingSpotifyIds} missing`);
            console.log(`  Will update: ${updateAll ? 'All' : 'Only missing'} IDs (${updateAll ? artists.length : missingSpotifyIds} artists)`);
        }
        if (updateYoutube) {
            console.log(`- YouTube Music: ${artists.length - missingYoutubeIds} artists have IDs, ${missingYoutubeIds} missing`);
            console.log(`  Will update: ${updateAll ? 'All' : 'Only missing'} IDs (${updateAll ? artists.length : missingYoutubeIds} artists)`);
        }

        // Choose how many to process
        const { artistLimit } = await inquirer.prompt([
            {
                type: 'list',
                name: 'artistLimit',
                message: 'How many artists would you like to process?',
                choices: [
                    { name: `All ${artists.length} artists`, value: 'all' },
                    { name: '10 artists', value: '10' },
                    { name: '25 artists', value: '25' },
                    { name: '50 artists', value: '50' },
                    { name: 'Custom number...', value: 'custom' }
                ]
            }
        ]);

        let artistsToProcess = artists.length;

        if (artistLimit === 'custom') {
            const { customLimit } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'customLimit',
                    message: 'Enter the number of artists to process:',
                    validate: (input) => {
                        const num = parseInt(input, 10);
                        if (isNaN(num) || num <= 0) {
                            return 'Please enter a valid positive number';
                        }
                        return true;
                    }
                }
            ]);

            artistsToProcess = parseInt(customLimit, 10);
        } else if (artistLimit !== 'all') {
            artistsToProcess = parseInt(artistLimit, 10);
        }

        console.log(`\nProcessing up to ${artistsToProcess} artists...\n`);

        let updatedCount = 0;

        // Process artists
        for (let i = 0; i < Math.min(artistsToProcess, artists.length); i++) {
            const artist = artists[i];
            let updated = false;

            console.log(`[${i+1}/${Math.min(artistsToProcess, artists.length)}] Processing "${artist.name}"`);

            // Update Spotify ID
            if (updateSpotify && spotifyToken && (updateAll || !artist.spotifyId || artist.spotifyId === '0TnOYISbd1XYRBk9myaseg')) {
                const newId = await searchSpotifyArtist(artist.name, spotifyToken);
                if (newId) {
                    artist.spotifyId = newId;
                    updated = true;
                }

                // Respect API rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Update YouTube ID
            if (updateYoutube && (updateAll || !artist.youtubeId || artist.youtubeId.includes('UC-Example'))) {
                const newId = await searchYoutubeArtist(artist.name);
                if (newId) {
                    artist.youtubeId = newId;
                    updated = true;
                }

                // Respect API rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if (updated) updatedCount++;
        }

        console.log(`\nUpdated ${updatedCount} artists`);

        // Write updated artists back to file
        writeArtistsFile(artists, fileContent);

        // Ask if user wants to run another query
        const { runAgain } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'runAgain',
                message: 'Would you like to run another update?',
                default: false
            }
        ]);

        if (runAgain) {
            return updateArtistIds();
        }

    } catch (error) {
        console.error('\n× Error running script:', error.message);
    }
}

// Run the script
updateArtistIds();