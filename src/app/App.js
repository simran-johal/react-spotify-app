import logo from '../assets/logo.svg';
import styles from './common.module.css';
import { SearchBar } from '../features/searchBar/SearchBar';
import { SearchResults } from '../features/searchResults/SearchResults';
import { Playlist } from '../features/playlist/Playlist';
import logoImage from '../assets/Spotify_Logo_RGB_Green.png';
function App() {


  


  return (
    <div className={styles.App}>

        <header id={styles.header}>

            <img id={styles.logo} src={logoImage}  />
        </header>


        <main id={styles.main}> 
            <div id={styles.title}>
                <h1>Discover and stream your favourite music with <span>Spotify</span></h1>
            </div>
            <SearchBar />
            <SearchResults />
            <Playlist />
        </main>



        <footer id={styles.footer}>
            <p>&copy; 2024 Simran Johal. All rights reserved.</p>  
        </footer>

    </div>
  );
}

export default App;
