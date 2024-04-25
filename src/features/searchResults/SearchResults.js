import React from 'react';
import styles from './searchResults.module.css'
import { TrackList } from '../trackList/Tracklist';


export const SearchResults = (props) => {
    // outside JSX

    return (
        <div id={styles.searchResultsContainer}>
            <div id={styles.content}>
                <h1 id={styles.header}>
                    Results
                </h1>
                <TrackList/>

            </div>
        </div>
        
    )
}