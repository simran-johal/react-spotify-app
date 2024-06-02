

// function to construct authorization URL and redirect USER
export const redirectToSpotifyAuthorization = () => {
    const responseType = 'RESPONSE TYPE HERE'; // code
    const clientId = 'CLIENT ID HERE';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('REDIRECT URI HERE');
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
    const clientId = 'CLIENT ID HERE'; 
    const clientSecret = 'CLIENT SECRET HERE';
    const redirectUri = 'REDIRECT URI HERE';
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

