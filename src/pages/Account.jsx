import React from 'react';
import { UserAuth } from '../context/AuthContext';
import Forum from '../components/Forum';
import "./Account.css";

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import firebase from '../firebase'; // Import your Firebase configuration

const Account = () => {
  const { user } = UserAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to send a message to Firebase
  const sendMessage = async () => {
    if (message) {
      const messageData = {
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        sender: user.displayName,
      };

      await firebase.database().ref('messages').push(messageData);
      setMessage('');
    }
  };

  // Function to fetch messages from Firebase
  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('value', (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        const messageData = childSnapshot.val();
        messageList.push(messageData);
      });

      // Update the state with the messages
      setMessages(messageList);
    });

    // Clean up the listener when the component unmounts
    return () => messagesRef.off('value');
  }, []);

  return (
    <div className='accountBox'>
      <h1 className='hello'>Deep Notes</h1>
      <div className='accountInfo'> 
        <p className='personalGreeting'>Welcome, {user?.displayName}</p>
        <br></br>
        <Forum user={user} />
         <div className='updatesBox'>
        {/* Display messages */}
        {messages.map((messageData, index) => (
          <div key={index}>
            <p>{messageData.sender}: {messageData.text}</p>
          </div>
        ))}

        <br />
        <h2>PROTECTED CONTENT</h2>
        <br />
        <p>Sensitive information will be posted here about members-only content.</p>
      </div>
        <div>
        <input
          type='text'
          placeholder='Type your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      </div>
      <button onClick={handleSignOut} className='logoutBtn'>
        Logout
      </button>
    </div>
  );
};

export default Account;
