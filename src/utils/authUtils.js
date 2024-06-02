

// function to construct authorization URL and redirect USER
export const redirectToSpotifyAuthorization = () => {
    const responseType = 'code';
    const clientId = 'cbcdb22a0db349978821aa6866c9617b';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:3000/callback ');
    const authorizationUrl = 'AUTHORIZATION URL HERE';

    window.location.href = authorizationUrl;
};

// function to extract authorization code from URL
export const extractAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code'); // get the value of the 'code' param
};

// function to exchange authorization code for access token
export const exchangeCodeForToken = async (code) => {
    const clientId = 'cbcdb22a0db349978821aa6866c9617b'; 
    const clientSecret = '5aea38c0e14f4dc7b7a6fdb034f1272b';
    const redirectUri = 'http://localhost:3000/callback';
    const tokenUrl = 'ENDPOINT URL HERE';

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirectUri: redirectUri,
        clientId: clientId,
        clientSecret: clientSecret
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            header: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: body.toString()
        });

        if (!response.ok) {
            throw new Error('Failed to exchange authorization code for token');
        }

        const data = await response.json()
        return data.access_token;

    } catch (error) {
        console.log('Error', error);
        return null;
    }
}


