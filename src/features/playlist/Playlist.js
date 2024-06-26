import React, {useState} from 'react';
import styles from './playlist.module.css'
import { PlaylistTrack } from '../playlistTrack/PlaylistTrack'
import { getUserId, savePlaylistToSpotify } from '../../utils/fetchUtils';
import { toast } from 'react-toastify'



export const Playlist = ({playlistData, setPlaylistData, moveTrackToTrackList, data}) => {

    const [playlistName, setPlaylistName] = useState('')
    let accessToken = localStorage.getItem('accessToken');



    
    const playlistSaving = async (event) => { 

        try {
            const userId = await getUserId() 
            if (userId) {
                const savedPlaylist = await savePlaylistToSpotify(playlistName, userId, playlistData)
                console.log('Playlist saved ah-success-full-eh: ', savedPlaylist, playlistName)
                
                playlistData.forEach(track => {moveTrackToTrackList(track.id) })

                setPlaylistName('')
                setPlaylistData([])

               toast.success('Playlist saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
            } else {
                console.log('User ID not found. Unable to save playlist')
                
            }
        } catch (fetchError) {
            console.log('Error saving playlist: ', fetchError.message)
            /*alert(`Failed to save playlist: ${fetchError.message}`);*/

            toast.error('Playlist failed to save!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
           
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
                    {!playlistData ? <p></p>
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