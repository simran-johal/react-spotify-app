import React from 'react';
import styles from './playlist.module.css'
import { PlaylistTrack } from '../playlistTrack/PlaylistTrack'


export const Playlist = ({playlistData, setPlaylisData}) => {

    if (!playlistData || !playlistData.tracks || playlistData.tracks.items.length === 0) {
        return <p>No Tracks Found</p>; // OPTIMISE THIS
    }
   

    return (
        <div id={styles.playlistContainer}>
            <div id={styles.content}>

                <input id={styles.playlistName} placeholder='Name your playlist...'  />

                
                <ul id={styles.list}>
                    {playlistData.tracks.items.map((track) => ( 
                        <li key={track.id}> 
                            <PlaylistTrack 
                                trackName={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                                trackId={track.id}
                            />
                        </li>
                    ))} 
                </ul>




                <button id={styles.btn}>Save to Spotify</button>
            </div>
        </div>
        
    )
}