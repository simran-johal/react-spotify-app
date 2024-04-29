import React from 'react';
import styles from './trackList.module.css'
import { Track } from '../track/Track';


export const TrackList = (props) => {
    

    // Here we will determine the state management / logic for Tracklist 


    let mocking = [
        {songName: "songNameA", artist: "artistA", album: "albumA"},
        {songName: "songNameB", artist: "artistB", album: "albumB"},
        {songName: "songNameC", artist: "artistC", album: "albumC"}
    ]



    return (
        <div id={styles.trackListContainer}>
            <div id={styles.content}>
                
                <ul>
                    {mocking.map((mocks) => (
                        <li  > 
                            <Track
                                track ={mocks}
                            />
                        </li>  
                  ))} 
                </ul>
                
                
            </div>
        </div>
        
    )
}