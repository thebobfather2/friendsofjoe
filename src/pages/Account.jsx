import React from 'react';
import { UserAuth } from '../context/AuthContext';
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

  return (
    <div className='accountBox'>
      <h1 className='hello'>Deep Notes</h1>
      <div className='accountInfo'> 
        <p className='personalGreeting'>Welcome, {user?.displayName}</p>
        <br></br>
        <div className='updatesBox'>
          <br></br>
          <h2>PROTECTED CONTENT</h2>
          <br></br>
          <p>Sensitive information will be posted here about members only content.</p>
        </div>
      </div>
      <button onClick={handleSignOut} className='logoutBtn'>
        Logout
      </button>
    </div>
  );
};

export default Account;
