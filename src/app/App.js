import logo from '../assets/logo.svg';
import styles from './common.module.css';
import { SearchBar } from '../features/searchBar/SearchBar';
import { SearchResults } from '../features/searchResults/SearchResults';
import { Playlist } from '../features/playlist/Playlist';
import logoImage from '../assets/Spotify_Logo_RGB_Green.png';
import React, {useState, useEffect} from 'react';
import { TrackList } from '../features/trackList/Tracklist';


function App() {

    const [data, setData] = useState('')
    const [playlistData, setPlaylistData] = useState('')


    // HANDLE REMOVAL OF TRACK + CREATE UPDATED DATA COPY -> MOVE TO UTILITY
    const removeTrackFromList = (trackId, event) => {
        event.preventDefault();

        if (data && data.tracks && data.tracks.items) {
            
            const updatedTracks = data.tracks.items.filter((track) => track.id !== trackId);

            const updatedData = {
                ...data,
                tracks: {
                    ...data.tracks,
                    items: updatedTracks
                }
            }
            setData(updatedData)

            const removedTrack = data.tracks.items.find(track => track.id === trackId)

            if (removedTrack) {
                setPlaylistData(
                    [...playlistData, removedTrack])
                    console.log("Console Playlist: ", playlistData)
            }
        }


        


    }



    /*useEffect(() => {
        console.log('Data updated:', data);
      }, [data]);*/





  return (
    <div className={styles.App}>

        <header id={styles.header}>
            <img id={styles.logo} src={logoImage}  />
        </header>


        <main id={styles.main}> 
            <section id={styles.section1}>
                <div id={styles.title}>
                    <h1>Discover and stream your favourite music with <span>Spotify</span></h1>
                </div>
                <SearchBar data={data} setData={setData}/>   
            </section>
        

            <section id={styles.section2}>
                <SearchResults
                    data={data} 
                    setData={setData}
                    removeTrackFromList={removeTrackFromList} />
                <Playlist 
                    playlistData={playlistData} 
                    setPlaylistData={setPlaylistData} />
            </section>
        </main>



        <footer id={styles.footer}>
            <p>&copy; 2024 Simran Johal. All rights reserved.</p>  
        </footer>

    </div>
  );
}

export default App;
