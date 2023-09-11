import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Update the path to your firebase.js file

const Forum = () => {
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
    // Fetch messages from Firebase Firestore and update the state
    const fetchMessages = async () => {
      try {
        const querySnapshot = await db.collection('messages').orderBy('timestamp', 'desc').get();
        const messageData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      } catch (error) {
        console.error('Error fetching messages:', error);
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
      // Add a new message to Firebase Firestore
      await db.collection('messages').add({
        text: newMessage,
        timestamp: new Date(),
        userId: user.uid,
        userName: user.displayName,
      });

      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      ) : (
        <p>Please sign in to participate in the forum.</p>
      )}

      <div>
        <h2>Forum Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.userName}:</strong> {message.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;
