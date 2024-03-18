import React from 'react';
import styles from './playlist.module.css'

export const Playlist = () => {
    // outside JSX

    return (
        <div>
            <p id={styles.playlistContainer}>
                My Playlist Component
            </p>
        </div>
        
    )
}