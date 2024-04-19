import React from 'react';
import styles from './searchBar.module.css';

export const SearchBar = (props) => {
    // outside JSX 

    return (
        <div id={styles.searchBarComponentContainer}>

            <h1>Search</h1>
            <input
                type="text"
                id="song-search"
            />
            <button>Search</button>
        </div>
        
    )
}