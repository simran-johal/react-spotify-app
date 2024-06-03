import { refreshAccessToken } from "./authUtils";

const constructUrl = (searchTerm) => {
    const baseUrl = 'https://api.spotify.com/v1' 
    const endpoint = '/search' 
    const limit = 20;
    const type = 'track, artist, album'

    const requestParams = `?q=${encodeURIComponent(searchTerm)}&type=${type}&limit=${limit}`;
    return `${baseUrl}${endpoint}${requestParams}`
}


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

        // refresh token code starts
        if (response.status === 401) {
            try {
                accessToken = await refreshAccessToken(); // if response erro refresh access token
                if (!accessToken) {                     // if fails then throw error telling us
                    throw new Error('Failed to refresh access token');
                }

                response = await fetch(urlToFetch, {    // if get new accessToken try to fetch now
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            } catch (refreshError) {                    // if fails tell us
                throw new Error('Error refreshing access token: ' + refreshError.message)
            }
        }

        // refresh token code ends

        if (!response.ok) {                             // if neither 
            throw new Error('Network response was not ok');
        };

        return await response.json();                   // once successful refresh/access + got response
    } catch (fetchError) {
        throw new Error('Error fetching data: ' + fetchError.message)

    }
}