import logo from '../assets/logo.svg';
import styles from './common.module.css';
import { SearchBar } from '../features/searchBar/SearchBar';
import { SearchResults } from '../features/searchResults/SearchResults';
import { Playlist } from '../features/playlist/Playlist';

function App() {


  


  return (
    <div className={styles.App}>

        <header className="App-header">
            <img />
        </header>


        <main> 
            <h1 id={styles.test}>Discover and stream your favourite music with Spotify</h1>
            <SearchBar />
            <SearchResults />
            <Playlist />
        </main>



        <footer>
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>  
        </footer>
        
    </div>
  );
}

export default App;
