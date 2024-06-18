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

const constructSavePlaylistUrl = (userId) => {
    const baseUrl = 'https://api.spotify.com/';
    const endpoint = `v1/users/${userId}/playlists`;

    return `${baseUrl}${endpoint}`

}


// POST REQUEST FETCH FUNCTION
export const savePlaylistToSpotify = async (playlistName, userId) => {
    /*console.log(
        'playlist name: ', playlistName,
        'userId: ', userId
    )*/

    const urlToFetch = constructSavePlaylistUrl(userId);

    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token available')
    }

    const requestBody = {
        name: playlistName
    };

    try {
        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text()
            console.log('Response error text: ', errorText)
        }

        const data = await response.json();
        return data


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
            const errorText = await response.json()
            console.log('Response error: ', errorText)
        }

        const userData = response.json()
        const userId = userData.object.id
        console.log("get user id func: ", userData)
        return userId

    } catch (fetchError) {
        console.log(fetchError.message)
    }


}






