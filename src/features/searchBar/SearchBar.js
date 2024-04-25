import React from 'react';
import styles from './searchBar.module.css';

export const SearchBar = (props) => {
    // outside JSX 

    return (
        <div id={styles.searchBarComponentContainer}>
            <div id={styles.content}>



                <h1 id={styles.h1}>Search</h1>
                <input
                    type="text"
                    id={styles.songSearch}
                    placeholder="song, artist or album..."
                />
                <button id={styles.button}>Search Spotify</button>




            </div>
        </div>
        
    )
}