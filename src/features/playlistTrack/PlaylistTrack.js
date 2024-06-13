import React from 'react';
import styles from './playlistTrack.module.css'



export const PlaylistTrack = ({trackName, artistName, albumName, trackId}) => {

   

    return (
        <div id={styles.playlistTrackContainer}>
            <div id={styles.content}>

                <p id={styles.songName}>{trackName}</p>
                <p id={styles.artist}>By {artistName}</p>
                <p id={styles.album}>From {albumName}</p>
                <button 
                    id={styles.btn}
                     //onClick={(event) => removeTrackFromList(trackId, event)}
                >{'-'}</button>
                
            </div>
        </div>
        
    )
}