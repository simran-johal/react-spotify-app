import { refreshAccessToken } from "./authUtils";


// URL CONSTRUCTION FOR GET REQUEST
const constructUrl = (searchTerm) => {
    const baseUrl = 'https://api.spotify.com/' 
    const endpoint = 'v1/search' 
    const limit = 15;
    const type = ['track']

    //const requestParams = `?q=${encodeURIComponent(searchTerm)}&type=${type}&limit=${limit}`;
    const requestParams = `?q=${encodeURIComponent(searchTerm)}&type=${type.join(',')}&limit=${limit}`;
    return `${baseUrl}${endpoint}${requestParams}`
}


// GET REQUEST FETCH FUNCTION
export const fetchDataWithToken = async (searchTerm) => {
    const urlToFetch = constructUrl(searchTerm);


    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token available')
    }

    try {
        const response = await fetch(urlToFetch, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 401) {
            try {
                
                console.log('Access token expired. Refreshing token...') 
                accessToken = await refreshAccessToken(); 
                if (!accessToken) {                    
                    throw new Error('Failed to refresh access token');
                }

                response = await fetch(urlToFetch, {   
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            } catch (refreshError) {                 
                throw new Error('Error refreshing access token: ' + refreshError.message)
                
            }
        }

        if (!response.ok) {           
            const errorText = await response.text()
            console.log('Response error: ', errorText)             
            throw new Error('Network response was not ok');
        } else {
            console.log("Fetch Successful...")
        }

        const data = await response.json();                 
        return data
    } catch (fetchError) {
        throw new Error('Error fetching data: ' + fetchError.message)

    }
}



// URL CONSTRUCTION FOR POST REQUEST

const constructCreatePlaylistUrl = (userId) => {
    const baseUrl = 'https://api.spotify.com/';
    const endpoint = `v1/users/${userId}/playlists`;

    return `${baseUrl}${endpoint}`

}

const constructAddTracksUrl = (playlistId) => {
    const baseUrl = 'https://api.spotify.com/';
    const endpoint = `v1/playlists/${playlistId}/tracks`;

    return `${baseUrl}${endpoint}`

}


// POST REQUEST TO SAVE PLAYLIST + TRACKS TOGETHER
export const savePlaylistToSpotify = async (playlistName, userId, playlistData) => {
   
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('No access token available')
    const createPlaylistUrlToFetch = constructCreatePlaylistUrl(userId);


    const requestBody = {
        name: playlistName,
        public: false
    };

    try {

        // CREATING THE PLAYLIST
        const creatingResponse = await fetch(createPlaylistUrlToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!creatingResponse.ok) {
            const errorText = await creatingResponse.text()
            console.log('Response error text: ', errorText)
        }

        const createdPlaylistData = await creatingResponse.json();
        const playlistId = createdPlaylistData.id;




        // ADDING THE TRACKS
        const saveTracksUrlToFetch = constructAddTracksUrl(playlistId);

        const trackUris = playlistData.map(track => track.uri);

        const saveTracksResponse = await fetch(saveTracksUrlToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ uris: trackUris })
        });

        if (!saveTracksResponse.ok) {
            const errorText = await saveTracksResponse.text();
            throw new Error(`Failed to add tracks: ${errorText}`);
        }

        return { playlistId, trackCount: trackUris.length };

    } catch (fetchError) {
        console.log(fetchError.message)
    }
}





// GET REQUEST TO RETRIEVE USER ID
export const getUserId = async () => {
    const baseUrl = 'https://api.spotify.com/';
    const endpoint = 'v1/me';
    const urlToFetch = `${baseUrl}${endpoint}`

    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token available')
    }

    try {

        const response = await fetch(urlToFetch, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.log('Response error: ', errorText)
        }

        const userData = await response.json()
        const userId = userData.id
        console.log("Got User ID Successfully: ", userId)
        return userId

    } catch (fetchError) {
        console.log(fetchError.message)
    }


}






