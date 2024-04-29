import React from 'react';
import styles from './track.module.css'



export const Track = (props) => {
    // outside JSX

    return (
        <div id={styles.trackContainer}>
            <div id={styles.content}>
                
                <p>{/* track.name */}</p>
                <p>{/* track.artist */}</p>
                <p>{/* track.album */}</p>
                <button></button>

                
            </div>
        </div>
        
    )
}