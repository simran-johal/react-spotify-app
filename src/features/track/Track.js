import React from 'react';
import styles from './track.module.css'



export const Track = ({trackName, artistName, albumName, moveTrackToPlaylist, trackId}) => {





    return (
        <div id={styles.trackContainer}>
            <div id={styles.content}>
                
                <p id={styles.songName}>{trackName}</p>
                <p id={styles.artist}>By {artistName}</p>
                <p id={styles.album}>From {albumName}</p>
                <button 
                    id={styles.btn}
                    onClick={(event) => moveTrackToPlaylist(trackId, event)}
                >{'+'}</button>

                
            </div>
        </div>
        
    )
}