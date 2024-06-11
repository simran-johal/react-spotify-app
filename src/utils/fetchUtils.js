import { refreshAccessToken } from "./authUtils";

const constructUrl = (searchTerm) => {
    const baseUrl = 'https://api.spotify.com/v1' 
    const endpoint = '/search' 
    const limit = 20;
    const type = ['track']

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