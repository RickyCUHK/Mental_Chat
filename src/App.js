import './App.css';
import Chat from "./components/Chat";
import background from './assets/background.jpeg';

function App() {
  return (
    <div className="App" style={styles.appContainer}>
      <div style={styles.chatArea}>
        <header style={styles.header}>
          <h1 style={styles.headerText}>Empath</h1>
        </header>
        <Chat />
      </div>
    </div>
  );
}

export default App;

const styles = {
  appContainer: {
    height: '100vh',        
    display: 'flex',           
    flexDirection: 'column', 
    margin: 0,
    padding: 0,
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
  },
  header: {
    flexShrink: 0,             
    backgroundColor: "#355c7d",
    padding: '0.5em',
  },
  headerText: {
    color: "white"
  },
  chatArea: {
    flex: 1,                   
    display: 'flex',
    flexDirection: 'column',
  },
};
