import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Update the path to your firebase.js file
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

import './WorldChat.css'; // Import your CSS file

const WorldChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Fetch messages from the WorldChat collection in Firebase Firestore
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'WorldChat'), // Use the name of your collection
          orderBy('timestamp', 'asc') // Order messages by timestamp in ascending order
        );
        const querySnapshot = await getDocs(q);
        const messageData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      } catch (error) {
        console.error('Error fetching WorldChat messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    try {
      // Add a new message to the WorldChat collection
      await addDoc(collection(db, 'WorldChat'), {
        text: newMessage,
        timestamp: new Date(),
        userId: user.uid,
        userName: user.displayName,
      });

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Error adding WorldChat message:', error);
    }
  };

  return (
    <div className="world-chat-container">
      {user ? (
        <div className="chatBox">
          <h2>World Chat Messages</h2>
          <ul className="message-list">
            {messages.map((message) => (
              <li key={message.id} className="message-item">
                <strong>{message.userName}</strong>
                <span className="timestamp">
                  {message.timestamp.toDate().toLocaleString()}
                </span>
                <p className="message-text">{message.text}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="message-button">
              Post
            </button>
          </form>
        </div>
      ) : (
        <p>Please sign in to participate in the World Chat.</p>
      )}
    </div>
  );
};

export default WorldChat;
