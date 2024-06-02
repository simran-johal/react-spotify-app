


export const fetchData = async (accessToken, searchTerm) => {
    const baseUrl = 'https://api.spotify.com/v1' 
    const endpoint = '/search' 
    const limit = 20;
    const type = ['track', 'artist', 'album']

    const requestParams = `?q=${encodeURIComponent(searchTerm)}&type=${type}&limit=${limit}`;
    const urlToFetch = `${baseUrl}${endpoint}${requestParams}`

    try {

        const response = await fetch(urlToFetch, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        };

        const data = await response.json();
        return data; // maybe not

    } catch (error) {
        console.log('Fetch error:', error);
        throw error;
    }
}