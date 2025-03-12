import React, { useState } from "react";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App" style={styles.appContainer}>
      <div style={styles.chatArea}>
        {started ? <Chat /> : <LandingPage onStart={() => setStarted(true)} />}
      </div>
    </div>
  );
}

export default App;

const styles = {
  appContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    backgroundImage: `url(${require("./assets/background.jpeg")})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
  },
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
};
