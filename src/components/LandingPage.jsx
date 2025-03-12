import React from "react";

function LandingPage({ onStart }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Mental Chat</h1>
      <p style={styles.subtitle}>
        An AI chatbot that provides psychological support
      </p>
      <button style={styles.button} onClick={onStart}>
        Start a chat
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5em",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "1em",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LandingPage;
