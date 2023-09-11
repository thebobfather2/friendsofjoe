import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logoImage from './cimadown.jpeg';
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='nav'>
    <div className='flex justify-between bg-200 w-full'>
      <div className='navBar'>
        {/* Replace <h1> and <h2> with <img> */}
        <img src={logoImage} alt='Deep Notes Logo' className='navLogo' />
      </div>
      
      <div className='signin'>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to='/signin'>Sign in</Link>
      )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
