import React from 'react';
import styles from './playlist.module.css'
import { PlaylistTrack } from '../playlistTrack/PlaylistTrack'


export const Playlist = ({playlistData, setPlaylistData, moveTrackToTrackList}) => {

    console.log("PlaylistTracks here: ", playlistData) // Confirmed
   

    return (
        <div id={styles.playlistContainer}>
            <div id={styles.content}>

                <input id={styles.playlistName} placeholder='Name your playlist...'  />
                <ul id={styles.list}>
                    {!playlistData ? <p>No Tracks Added to Playlist</p>
                     :playlistData.map((track) => ( 
                        <li key={track.id}> 
                            <PlaylistTrack 
                                trackName={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                                trackId={track.id}
                                moveTrackToTrackList={moveTrackToTrackList}
                            />
                        </li>
                    ))} 
                </ul>




                <button id={styles.btn}>Save to Spotify</button>
            </div>
        </div>
        
    )
}