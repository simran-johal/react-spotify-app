import React from 'react';
import styles from './track.module.css'



export const Track = ({track}) => {
    // outside JSX


    let addOrRemove = "x"

    return (
        <div id={styles.trackContainer}>
            <div id={styles.content}>
                
                <p id={styles.songName}>{track.songName}</p>
                <p id={styles.artist}>{track.artist}</p>
                <p id={styles.album}>{track.album}</p>
                <button id={styles.btn}>{addOrRemove}</button>

                
            </div>
        </div>
        
    )
}