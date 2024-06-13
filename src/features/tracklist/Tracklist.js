import React from 'react';
import styles from './trackList.module.css'
import { Track } from '../track/Track';


export const TrackList = ({data, setData, removeTrackFromList}) => {
    


    





    if (!data || !data.tracks || data.tracks.items.length === 0) {
        return <p>No Tracks Found</p>;
    }
    /*console.log("Logging data in Tracklist: ", data) DATA REACHING */

    return (
        <div id={styles.trackListContainer}>
            <div id={styles.content}>

                <ul id={styles.list}>
                    {data.tracks.items.map((track) => ( 
                        <li key={track.id}> 
                            <Track 
                                trackName={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                                removeTrackFromList={removeTrackFromList}
                                trackId={track.id}
                            />
                        </li>
                    ))} 
                </ul>
                
                
            </div>
        </div>
        
    )
}

