import React, {useState} from 'react';
import styles from './playlist.module.css'
import { PlaylistTrack } from '../playlistTrack/PlaylistTrack'
import { getUserId, savePlaylistToSpotify } from '../../utils/fetchUtils';



export const Playlist = ({playlistData, setPlaylistData, moveTrackToTrackList, data}) => {

    const [playlistName, setPlaylistName] = useState('')

    let accessToken = localStorage.getItem('accessToken');

    const playlistSaving = async (event) => { 

        try {

            const userId = await getUserId() 

            if (userId) {
                const savedPlaylist = await savePlaylistToSpotify(playlistName, userId)
                console.log('Playlist saved ah-success-full-eh: ', savedPlaylist)
            } else {
                console.log('User ID not found. Unable to save playlist')
            }


        } catch (fetchError) {
            console.log('Error saving playlist: ', fetchError.message)
        }

    }

    


    const handlePlaylistSave = (event) => {
        
        if (accessToken) {
            playlistSaving()
        } else {
            console.log('Access token not found. Unable to save playlist.')
        }
    }



    return (
        <div id={styles.playlistContainer}>
            <div id={styles.content}>

                <input 
                    id={styles.playlistName} 
                    placeholder='Name your playlist...'  
                    onChange={(e) => setPlaylistName(e.target.value)}
                    value={playlistName}
                    />

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

                <button 
                    id={styles.btn}
                    onClick={handlePlaylistSave}
                >Save to Spotify</button>
            </div>
        </div>
        
    )
}