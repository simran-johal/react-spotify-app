import React from 'react';
import styles from './searchResults.module.css'
import { TrackList } from '../trackList/Tracklist';


export const SearchResults = ({data, setData, removeTrackFromList}) => {

    // here we will manage SearchResults' state + event handler logic



    return (
        <div id={styles.searchResultsContainer}>
            <div id={styles.content}>
                <h1 id={styles.header}>
                    Results
                </h1>
                <TrackList 
                    data={data} 
                    setData={setData} 
                    removeTrackFromList={removeTrackFromList}
                        />


            </div>
        </div>
        
    )
}