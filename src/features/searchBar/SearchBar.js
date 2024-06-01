import React, {useState, useEffect} from 'react';
import styles from './searchBar.module.css';


export const SearchBar = (props) => {

    // here we will manage state variables
    const [name, setName] = useState(null)
    const [accessToken, setAcessToken] = useState(null)
    //const [data, setData] = useState(null)
    //const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(null)


    const handleInputChange = (event) => {
       const userInput = event.target.value
       setName(userInput)
    }

    const handleSubmit = (event) => {
        // here we will trigger the flow
        event.preventDefault();
        const searchTerm = event.target.search.value
        setSearchTerm(searchTerm);
        if (!accessToken) {
            // redirectToSpotifyAuthorization();
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
                    onSubmit={handleSubmit}
                >Search Spotify</button>



            </div>
        </div>
        
    )
}