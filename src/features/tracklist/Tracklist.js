import React from 'react';
import styles from './trackList.module.css'
import { Track } from '../track/Track';


export const TrackList = ({data, setData, moveTrackToPlaylist}) => {
    



    return (
        <div id={styles.trackListContainer}>
            <div id={styles.content}>

                <ul id={styles.list}>
                    {!data || 
                     !data.tracks || 
                     data.tracks.items.length === 0 
                     ? <p></p> 
                     :data.tracks.items.map((track) => ( 
                        <li key={track.id}> 
                            <Track 
                                trackName={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                                moveTrackToPlaylist={moveTrackToPlaylist}
                                trackId={track.id}
                            />
                        </li>
                    ))} 
                </ul>
                
                
            </div>
        </div>
        
    )
}

