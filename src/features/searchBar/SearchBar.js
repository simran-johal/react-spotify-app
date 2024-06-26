import React, {useState, useEffect} from 'react';
import { redirectToSpotifyAuthorization, extractAuthorizationCode, exchangeCodeForToken } from '../../utils/authUtils';
import { fetchDataWithToken } from '../../utils/fetchUtils';
import styles from './searchBar.module.css';
import { toast } from 'react-toastify'


export const SearchBar = ({data, setData}) => {

    const [name, setName] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')


    // DYNAMIC VALIDATION
    const handleInputChange = (event) => {
        setName(event.target.value)
     }

    // TOKEN EXCHANGE PROCESS OF AUTHORISATION
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const pendingSearchTerm = localStorage.getItem('pendingSearchTerm');

        if (storedToken) {
            setAccessToken(storedToken);

            if (pendingSearchTerm) {
                setSearchTerm(pendingSearchTerm);
                localStorage.removeItem('pendingSearchTerm');

                fetchData(pendingSearchTerm, storedToken) 
            }

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

            const pendingSearchTerm = localStorage.getItem('pendingSearchTerm');
            if (pendingSearchTerm) {
                setSearchTerm(pendingSearchTerm);
                localStorage.removeItem('pendingSearchTerm');
                fetchData(pendingSearchTerm, token);
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

  
    const fetchData = async () => {
        setLoading(true);
        try {

            const recievedData = await fetchDataWithToken(searchTerm, accessToken)
            setData(recievedData)
            console.log('Data state updated to: ', recievedData) // doesnt update instantly
            console.log('searchTerm is: ', searchTerm)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
}

     // FFETCH DATA WHEN SEARCHTEMR AND ACCESSTOKEN AVAILABLE
    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && searchTerm) { 
            fetchData(searchTerm, accessToken) 
            console.log("FetchData() executing...")
        }
    }, [accessToken, searchTerm]) 

    


    // HANDLING THE SEARCH TRIGGER NEW
    const handleSearch = (event) => {
        if (event) event.preventDefault();
        const storedToken = localStorage.getItem('accessToken');
        
        if (!storedToken) {
            localStorage.setItem('pendingSearchTerm', name);
            toast.success('User Authorised Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {redirectToSpotifyAuthorization()}, 2000);
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


