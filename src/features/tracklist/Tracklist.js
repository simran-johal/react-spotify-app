import React from 'react';
import styles from './trackList.module.css'
import { Track } from '../track/Track';


export const TrackList = ({data, setData}) => {
    


    if (!data || !data.tracks || data.tracks.items.length === 0) {
        return <p>No Tracks Found</p>;
    }


    return (
        <div id={styles.trackListContainer}>
            <div id={styles.content}>

                <ul id={styles.list}>
                    {data.tracks.items.map((track) => { 

                        <li key={track.id}> {/* ID AUTOMATICALLY IN ALL DATA? */}
                            <Track 
                                trackName={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                            />
                        </li>
                    })} 
                </ul>
                
                
            </div>
        </div>
        
    )
}

// we map over at the items level e.g. data.tracks.itmes
// dependant on how many different pieces of data you get determines which data.[here].items you map
// if wanted album data would be data.album.items.map
// as we map over each item we then access the properties we need as is necessary