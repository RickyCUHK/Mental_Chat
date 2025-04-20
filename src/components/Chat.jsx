import React, { useState, useRef, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);  // 添加初始化状态
  const messagesEndRef = useRef(null);

  // 添加自动滚动函数
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // 当消息更新时自动滚动
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  async function sendMessage() {
    if (!userMessage.trim()) return; // Ignore empty messages
  
    // Create User Message with Timestamp
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { role: 'user', text: userMessage, timestamp: userTimestamp };
    setMessages((prev) => [...prev, newMessage]);
  
    // Clear input field & show loading state
    setUserMessage('');
    setIsLoading(true);
  
    try {
      const tunedMessage = userMessage + " Could you make your response sound like a mental therapist?";
      const response = await fetch('/.netlify/functions/googling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: tunedMessage }),
      });
  
      const data = await response.json();
  
      // Remove all pairs of '**' bc GPT's reply is in markdown form
      const cleanedText = data.message.replace(/\*\*/g, '');
  
      // Create Bot Message with Timestamp
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botReply = { role: 'bot', text: cleanedText, timestamp: botTimestamp };
  
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      // Optionally, display an error message
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const errorReply = { role: 'bot', text: 'Sorry, something went wrong. Please try again.', timestamp: errorTimestamp };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
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
          <div key={index} style={msg.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            {/* user icon */}
            {msg.role === 'user' ? (
              <img src="/user-avatar.png" alt="User" style={styles.avatar} />
            ) : (
              <img src="/bot-avatar.png" alt="Bot" style={styles.avatar} />
            )}
            
            {/* message */}
            {/* Message Box & Timestamp Wrapper */}
            <div style={styles.messageWrapper}>
            <div style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
              {msg.text}
            </div>
            <div style={msg.role === 'user' ? styles.userTimestamp : styles.botTimestamp}>
              {msg.timestamp}
            </div>
          </div>
          </div>
        ))}
  
        {isLoading && (
          <div style={styles.botMessageContainer}>
            <img src="/bot-avatar.png" alt="Bot" style={styles.avatar} />
            <div style={styles.botMessage}>
              <span style={styles.loadingDots}>Typing...</span>
            </div>
          </div>
        )}
  
        <div ref={messagesEndRef} />
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
    borderRadius: '12px',
    padding: '10px',
    overflowY: 'auto', // scroll if many messages
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  userMessageContainer: {
    display: 'flex',
    flexDirection: 'row-reverse', // User messages align right
    alignItems: 'flex-start', // Align avatar to the top
    marginBottom: '10px',
  },
  botMessageContainer: {
    display: 'flex',
    flexDirection: 'row', // Bot messages align left
    alignItems: 'flex-start', // Align avatar to the top
    marginBottom: '10px',
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Aligns the timestamp below the message
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
    display: 'inline-block',
    width: 'fit-content',
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
    color: 'white',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '5px',
    marginTop: '4px', // Ensure avatar starts at the top
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
  loadingDots: {
    display: 'inline-block',
    animation: 'ellipsis 1.4s infinite',
    fontSize: '16px',
    letterSpacing: '2px',
  },
  userTimestamp: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
    textAlign: 'right', // Aligns right for user messages
    alignSelf: 'flex-end', // Ensures it follows the message alignment
  },
  botTimestamp: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
    textAlign: 'left', // Aligns left for bot messages
    alignSelf: 'flex-start', // Ensures it follows the message alignment
  },
  '@keyframes loadingDots': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' },
  },
};
