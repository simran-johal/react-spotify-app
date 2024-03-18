import logo from '../assets/logo.svg';
import styles from './common.module.css';
import { SearchBar } from '../features/searchBar/SearchBar';
import { SearchResults } from '../features/searchResults/SearchResults';
import { Playlist } from '../features/playlist/Playlist';

function App() {


  


  return (
    <div className={styles.App}>

        <header id={styles.header}>
            <p id={styles.headerPTag}>header</p>
        </header>


        <main id={styles.main}> 
            <h1 id={styles.title}>Discover and stream your favourite music with Spotify</h1>
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
