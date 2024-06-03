import React, {useState, useEffect} from 'react';
import {redirectToSpotifyAuthorization,  extractAuthorizationCode, exchangeCodeForToken } from '../../utils/authUtils';
import { fetchDataWithToken } from '../../utils/fetchUtils';
import styles from './searchBar.module.css';


export const SearchBar = (props) => {

    const [name, setName] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)


    const handleInputChange = (event) => {
        const userInput = event.target.value
        setName(userInput)
     }


    // handle Authorisation + token exchange process
    useEffect(() => {

        const handleAuthorization = async () => { 
            const authorizationCode = extractAuthorizationCode()
            if (authorizationCode) {              
                setLoading(true);       
                try {                             
                    const token = await exchangeCodeForToken(authorizationCode)
                    if (token) {                  
                        setAccessToken(token)
                    }
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            }

        }
        handleAuthorization()
    }, [])


     // Fetch data when accessToken and searchTerm available
     useEffect(() => {

        if (accessToken && searchTerm) { 
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
            };
            fetchData() // need to figure out why this diffo in the example
        }

    }, [accessToken,searchTerm]) 

   

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.value // may be able to use userInput
        setSearchTerm(searchTerm);
        if (!accessToken) {
            redirectToSpotifyAuthorization();
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