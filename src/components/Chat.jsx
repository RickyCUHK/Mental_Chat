import React, { useState } from 'react';

function Chat() {
  // messages [{ role: 'user' | 'bot', text: string }]
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  async function sendMessage() {
    if (!userMessage.trim()) return; // ignore empty

    const newMessage = { role: 'user', text: userMessage };
    setMessages((prev) => [...prev, newMessage]);

    // Clear input field
    setUserMessage('');

    try {
      // Make the request to backend, change after cors setup
      const tunedMessage = userMessage + "Could you make your response sounds like a mental therapist?";
      const response = await fetch('/api/googling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: tunedMessage }),
      });

      const data = await response.json();

      // Remove all pairs of '**' bc gpt's reply is in markdown form.
      const cleanedText = data.message.replace(/\*\*/g, '');
      const botReply = { role: 'bot', text: cleanedText };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      // Optionally, display an error message
      const errorReply = {
        role: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorReply]);
    }
  }

  // Handle enter key to send message
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.role === 'user' ? styles.userMessage : styles.botMessage
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message here..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

// Simple inline styles for demonstration
const styles = {
  container: {
    width: '60vw',
    margin: '0 auto',
    marginTop: '2em',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
  },
  chatBox: {
    flex: 1,
    backgroundColor: "white",
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    overflowY: 'auto', // scroll if many messages
    marginBottom: '10px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    background: '#f0f0f0',
    padding: '8px 12px',
    margin: '4px 0',
    borderRadius: '12px',
    maxWidth: '60%',
    marginLeft: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    textAlign: 'left',
  },
  botMessage: {
    alignSelf: 'flex-start',
    background: '#355c7d',
    padding: '8px 12px',
    margin: '4px 0',
    borderRadius: '12px',
    maxWidth: '60%',
    marginRight: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    textAlign: 'left',
    color: "white",
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: "#355c7d",
    color: "white",
  },
};
