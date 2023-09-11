import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import Forum from '../components/Forum';
import deepnotes from '../../src/img/deepnotes.png';
import './Account.css';

const auth = getAuth(); // Initialize Auth
const db = getFirestore(); // Initialize Firestore

const Account = () => {
  const { logOut, user } = UserAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const sendMessage = async () => {
    if (message) {
      const messageData = {
        text: message,
        timestamp: new Date().getTime(),
        sender: user.displayName,
      };

      try {
        // Add a new document to the 'messages' collection
        await addDoc(collection(db, 'messages'), messageData);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    // Listen for changes in the 'messages' collection
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    // This code will update messages whenever a new message is added to Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = [];
      snapshot.forEach((doc) => {
        messageList.push(doc.data());
      });
      setMessages(messageList);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="appMain">
    <div className="accountBox">
    <img src={deepnotes} alt="DeepNote Logo" className="logo" />       <div className="accountInfo">
        <p className="personalGreeting">Welcome, {user?.displayName}</p>
          <br></br>
          <Forum user={user} />
      </div>
      <button onClick={handleSignOut} className="logoutBtn">
        Logout
      </button>
    </div>
    </div>
  );
};

export default Account;