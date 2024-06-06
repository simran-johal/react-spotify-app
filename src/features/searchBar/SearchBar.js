import React, {useState, useEffect} from 'react';
import { redirectToSpotifyAuthorization, extractAuthorizationCode, exchangeCodeForToken } from '../../utils/authUtils';
import { fetchDataWithToken } from '../../utils/fetchUtils';
import styles from './searchBar.module.css';


export const SearchBar = (props) => {

    const [name, setName] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)







    // DYNAMIC VALIDATION
    const handleInputChange = (event) => {
        const userInput = event.target.value
        setName(userInput)
     }

    // TOKEN EXCHANGE PROCESS OF AUTHORISATION
    const handleAuthorization = async () => {
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
                    redirectToSpotifyAuthorization()
                }
            } catch (error) {
                setError(error);
                console.error('Error during token exchange:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log('No authorization code found. Redirecting to Spotify authorization...');
            redirectToSpotifyAuthorization();
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
                    const data = await fetchDataWithToken(accessToken, searchTerm)
                    setData(data)
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
        
            if (accessToken && searchTerm) { 
                fetchData() 
                console.log("FetchData() executing...")
            }
        }
    }, [accessToken, searchTerm]) 

    
    useEffect(() => {
        


    }, [])
   
   
    
    // HANDLING THE SEARCH TRIGGER
    const handleSearch = (event) => {
        event.preventDefault();

       if (!accessToken) { // IF NO TOKEN
            console.log('No access token available. Executing handleAuthorisation() ');
            handleAuthorization();

           
        } else { // IF GOT TOKEN SEARCHTERM STATE UPDATED -> REMOUNT -> FETCH EFFECT EXECUTES DATA FETCH
            setSearchTerm(name);
            console.log(name)
            console.log('Access token is available: ', accessToken)
        } 
       
    }
    






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
                />
                <button 
                    id={styles.button}
                    onClick={handleSearch}
                >Search Spotify</button>

                <p>{JSON.stringify(data, null, 2)}</p> {/* want to pass this to SearchResults */}


            </div>
        </div>
        
    )
}