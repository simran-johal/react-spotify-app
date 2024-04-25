import React from 'react';
import styles from './playlist.module.css'
import { TrackList } from '../trackList/Tracklist';

export const Playlist = (props) => {
    // outside JSX

    return (
        <div id={styles.playlistContainer}>
            <div id={styles.content}>


                <input id={styles.playlistName} placeholder='Playlist Name'  />

                <TrackList/>
                <button id={styles.btn}>Save to Spotify</button>
            </div>
        </div>
        
    )
}