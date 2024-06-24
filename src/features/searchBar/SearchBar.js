import React, {useState, useEffect} from 'react';
import { redirectToSpotifyAuthorization, extractAuthorizationCode, exchangeCodeForToken } from '../../utils/authUtils';
import { fetchDataWithToken } from '../../utils/fetchUtils';
import styles from './searchBar.module.css';


export const SearchBar = ({data, setData}) => {

    const [name, setName] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)


    // DYNAMIC VALIDATION
    const handleInputChange = (event) => {
        setName(event.target.value)
     }

    // TOKEN EXCHANGE PROCESS OF AUTHORISATION
    /*const handleAuthorization = async () => {
        const authorizationCode = extractAuthorizationCode();
        console.log("1. Received Auth Code:", authorizationCode);

        if (authorizationCode) {
            setLoading(true);
            try {
                const token = await exchangeCodeForToken(authorizationCode);
                console.log('4. Access token received from exchangeFunc:', token);

                if (token) {
                    setAccessToken(token);

                } else {
                    console.log("Failed to obtain access token.");
                    setTimeout(() => {redirectToSpotifyAuthorization()},1000)
                }
            } catch (error) {
                setError(error);
                console.error('Error during token exchange:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log('No authorization code found. Redirecting to Spotify authorization...');
            setTimeout(() => {redirectToSpotifyAuthorization()},1000)
        }
    };*/

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
        } else {
            const authCode = extractAuthorizationCode();
            if (authCode) {
                handleCodeExchange(authCode);
            }
        }
    }, []);

    const handleCodeExchange = async (code) => {
        try {
            const token = await exchangeCodeForToken(code);
            if (token) {
                setAccessToken(token);
                localStorage.setItem('accessToken', token);
            }
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            setError(error);
        }
    };

  
    // CHECKING IF STATE IS UPDATED
    useEffect(() => {
        if (accessToken) {
            console.log("AccessToken updated: ", accessToken);
        }
    }, [accessToken]);

  

     // FFETCH DATA WHEN SEARCHTEMR AND ACCESSTOKEN AVAILABLE
    useEffect(() => {

            const fetchData = async () => {
                setLoading(true);
                try {

                    const recievedData = await fetchDataWithToken(searchTerm)
                    setData(recievedData)
                    console.log('Data state updated to: ', data) // doesnt update instantly
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
        }

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && searchTerm) { 
            fetchData() 
            console.log("FetchData() executing...")
        }
    }, [searchTerm]) 

    


    // HANDLING THE SEARCH TRIGGER OLD
    /*const handleSearch = (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem('accessToken');

       if (!accessToken) { // IF NO TOKEN
            console.log('No access token available. Executing handleAuthorisation() ');
            handleAuthorization();

        } else { // IF GOT TOKEN SEARCHTERM STATE UPDATED -> REMOUNT -> FETCH EFFECT EXECUTES DATA FETCH
            setSearchTerm(name);
            console.log(name)
            console.log('Access token is available: ', accessToken)
        } 
    }*/


    // HANDLING THE SEARCH TRIGGER NEW
    const handleSearch = (event) => {
        if (event) event.preventDefault();
        const storedToken = localStorage.getItem('accessToken');
        
        if (!storedToken) {
            redirectToSpotifyAuthorization();
            return;
        }

        setSearchTerm(name);
    };
    
    return (
        <div id={styles.searchBarComponentContainer}>
            <div id={styles.content}>


                <h1 id={styles.h1}>Search</h1>
                <input
                    value={name}
                    type="text"
                    id={styles.songSearch}
                    placeholder="song, artist or album..."
                    onChange={handleInputChange}
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch(event)}
                />
                <button 
                    id={styles.button}
                    onClick={handleSearch}
                    
                >Search Spotify</button>




            </div>
        </div>
        
    )
}


