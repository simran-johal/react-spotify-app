import React from 'react';
import styles from './playlist.module.css'
import { TrackList } from '../trackList/Tracklist';

export const Playlist = (props) => {

    // here we will manage SearchResults' state + event handler logic

    return (
        <div id={styles.playlistContainer}>
            <div id={styles.content}>


                <input id={styles.playlistName} placeholder='Name your playlist...'  />

                <TrackList/>
                <button id={styles.btn}>Save to Spotify</button>
            </div>
        </div>
        
    )
}