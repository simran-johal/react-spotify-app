import React from 'react';
import styles from './trackList.module.css'
import { Track } from '../track/Track';


export const TrackList = (tracks) => {
    

    // Here we will determine the state management / logic for Tracklist 






    return (
        <div id={styles.trackListContainer}>
            <div id={styles.content}>
                
                <ul>
                  {/*}  {tracks.map((tracks) => (
                        <li  > 
                            <Track
                                // pass props to produce Track required
                            />
                        </li>  
                  ))} */}
                </ul>
                
                
            </div>
        </div>
        
    )
}